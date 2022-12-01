const fs = require("fs")
const path = fs.readFileSync("path.lnk", "utf8").replace(/"/g, "").replace(/\//g, "\\").slice(0, -2) + "\\"
fs.copyFileSync("files\\.levels", path + ".levels")
fs.copyFileSync("files\\LevelData.plist", path + "Resources\\LevelData.plist")
process.exit(0)