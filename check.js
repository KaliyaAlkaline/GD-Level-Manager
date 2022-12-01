const fs = require("fs")
const path = fs.readFileSync("path.lnk", "utf8").replace(/"/g, "").replace(/\//g, "\\").slice(0, -2) + "\\"
fs.copyFileSync("files\\absolut_ext.dll", path + "absolut_ext.dll")
fs.copyFileSync("files\\absolute_lm.dll", path + "absolute_lm.dll")
fs.copyFileSync("files\\libcurl.dll", path + "libcurl.dll")
try {fs.copyFileSync("files\\.levels", path + ".levels", fs.constants.COPYFILE_EXCL)} catch (x) {}
process.exit(0)