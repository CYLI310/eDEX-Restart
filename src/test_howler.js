try {
    const howler = require("howler");
    console.log("Require successful");
    console.log("Keys:", Object.keys(howler));
    const { Howl, Howler } = howler;
    console.log("Howl:", typeof Howl);
    console.log("Howler:", typeof Howler);
} catch (e) {
    console.error("Error:", e);
}
