const fs = require("fs")
const path = fs.readFileSync("path.lnk", "utf8").replace(/"/g, "").replace(/\//g, "\\").slice(0, -2) + "\\"
const levels = JSON.parse(fs.readFileSync(path + ".levels", "utf8"))
const slices = JSON.parse(fs.readFileSync("slices.json", "utf8"))
const ping_ = Number(fs.readFileSync("ping_.json", "utf8").replace(/[^0-9]/g, ""))
if (ping_ <= levels.length && ping_ > 0) {
	let list = fs.readFileSync(path + "Resources\\LevelData.plist", "utf8")
	levels.splice((ping_ - 1), 1)
	let l = list.split("<string>").slice(1, -1)
	for (let i = 0; i < l.length; i++) {
		l[i] = l[i].split("</string>")[0]
	}
	l.splice((ping_ - 1), 1)
	for (let i = 0; i < l.length; i++) {
		l[i] = "<key>" + (i + 1) + "</key>\n<string>" + l[i] + "</string>"
	}
	let list_ = slices[0] + l.join("\n") + slices[1]
	fs.writeFileSync(path + ".levels", JSON.stringify(levels), "utf8")
	fs.writeFileSync(path + "Resources\\LevelData.plist", list_, "utf8")
}
process.exit(0)
