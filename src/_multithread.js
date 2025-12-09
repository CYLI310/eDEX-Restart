const cluster = require("cluster");

if (cluster.isMaster) {
    const electron = require("electron");
    const ipc = electron.ipcMain;
    const signale = require("signale");
    // Also, leave a core available for the renderer process
    const osCPUs = require("os").cpus().length - 1;
    // See #904
    const numCPUs = (osCPUs > 7) ? 7 : osCPUs;

    const si = require("systeminformation");

    cluster.setupMaster({
        exec: require("path").join(__dirname, "_multithread.js")
    });

    let workers = [];
    cluster.on("fork", worker => {
        workers.push(worker.id);
    });

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        signale.warn(`Worker ${worker.process.pid} died (code: ${code}). Restarting...`);
        const index = workers.indexOf(worker.id);
        if (index > -1) {
            workers.splice(index, 1);
        }
        cluster.fork();
    });

    signale.success("Multithreaded controller ready");

    var lastID = 0;

    function dispatch(type, id, arg) {
        if (workers.length === 0) return;

        let selectedID = lastID + 1;
        if (selectedID >= workers.length) selectedID = 0;

        const workerID = workers[selectedID];
        const worker = cluster.workers[workerID];

        if (worker) {
            worker.send(JSON.stringify({
                id,
                type,
                arg
            }));
        } else {
            // Worker died or is missing?
            signale.warn(`Worker ${workerID} not found/undefined in dispatch. Skipping.`);
        }

        lastID = selectedID;
    }

    var queue = {};
    ipc.on("systeminformation-call", (e, type, id, ...args) => {
        if (!si[type]) {
            signale.warn("Illegal request for systeminformation");
            return;
        }

        if (args.length > 1 || workers.length <= 0) {
            si[type](...args).then(res => {
                if (e.sender) {
                    e.sender.send("systeminformation-reply-" + id, res);
                }
            });
        } else {
            queue[id] = e.sender;
            dispatch(type, id, args[0]);
        }
    });

    cluster.on("message", (worker, msg) => {
        msg = JSON.parse(msg);
        try {
            if (!queue[msg.id].isDestroyed()) {
                queue[msg.id].send("systeminformation-reply-" + msg.id, msg.res);
                delete queue[msg.id];
            }
        } catch (e) {
            // Window has been closed, ignore.
        }
    });
} else if (cluster.isWorker) {
    try {
        const signale = require("signale");
        const si = require("systeminformation");

        signale.info("Multithread worker started at " + process.pid);

        process.on("message", msg => {
            try {
                msg = JSON.parse(msg);
                if (si[msg.type]) {
                    si[msg.type](msg.arg)
                        .then(res => {
                            process.send(JSON.stringify({
                                id: msg.id,
                                res
                            }));
                        })
                        .catch(err => {
                            signale.error(`Worker error in systeminformation call (${msg.type}):`, err);
                            process.send(JSON.stringify({
                                id: msg.id,
                                res: { error: true, message: err.message, original: err }
                            }));
                        });
                } else {
                    signale.error(`Worker received unknown systeminformation type: ${msg.type}`);
                }
            } catch (e) {
                signale.error("Worker failed to process message:", e);
            }
        });
    } catch (e) {
        console.error("Worker failed to start:", e);
        // Try to communicate back if possible, or just exit
        process.exit(1);
    }
}

