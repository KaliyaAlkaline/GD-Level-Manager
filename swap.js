const fs = require("fs")
const path = fs.readFileSync("path.lnk", "utf8").replace(/"/g, "").replace(/\//g, "\\").slice(0, -2) + "\\"
const levels = JSON.parse(fs.readFileSync(path + ".levels", "utf8"))
const slices = JSON.parse(fs.readFileSync("slices.json", "utf8"))
const ping_ = JSON.parse(fs.readFileSync("ping_.json", "utf8"))
if ((ping_["l1"] <= levels.length && ping_["l1"] > 0) && (ping_["l2"] <= levels.length && ping_["l2"] > 0)) {
	let list = fs.readFileSync(path + "Resources\\LevelData.plist", "utf8")
	let _1 = JSON.parse(JSON.stringify(levels[ping_["l1"] - 1]))
	let _2 = JSON.parse(JSON.stringify(levels[ping_["l2"] - 1]))
	levels[ping_["l1"] - 1] = _2
	levels[ping_["l2"] - 1] = _1
	let l = list.split("<string>").slice(1, -1)
	for (let i = 0; i < l.length; i++) {
		l[i] = l[i].split("</string>")[0]
	}
	let _3 = JSON.parse(JSON.stringify(l[ping_["l1"] - 1]))
	let _4 = JSON.parse(JSON.stringify(l[ping_["l2"] - 1]))
	l[ping_["l1"] - 1] = _4
	l[ping_["l2"] - 1] = _3
	for (let i = 0; i < l.length; i++) {
		l[i] = "<key>" + (i + 1) + "</key>\n<string>" + l[i] + "</string>"
	}
	let list_ = slices[0] + l.join("\n") + slices[1]
	fs.writeFileSync(path + ".levels", JSON.stringify(levels), "utf8")
	fs.writeFileSync(path + "Resources\\LevelData.plist", list_, "utf8")
}
process.exit(0)
