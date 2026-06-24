const fs = require("fs");

const oc = require("os")

fs.writeFileSync("dammy.txt", " trying to crate files with name of dammy.txt")

console.log(os.platform())
console.log(os.hostname())
console.log(os.cpus())