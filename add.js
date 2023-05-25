const fs = require("fs")
const path = fs.readFileSync("path.lnk", "utf8").replace(/"/g, "").replace(/\//g, "\\").slice(0, -2) + "\\"
const levels = JSON.parse(fs.readFileSync(path + ".levels", "utf8"))
const slices = JSON.parse(fs.readFileSync("slices.json", "utf8"))
const ping_ = JSON.parse(fs.readFileSync("ping_.json", "utf8"))
let list = fs.readFileSync(path + "Resources\\LevelData.plist", "utf8")
ping_["name"] = ping_["name"].replace(/[^a-zA-Z0-9 ]/g, "")
ping_["stars"] = Number(ping_["stars"].replace(/[^0-9\-]/g, ""))
if (!ping_["song"].includes(".mp3")) {
	ping_["song"] += ".mp3"
}
ping_["difficulty"] = Number(ping_["difficulty"])
if (ping_["name"] !== "" && ping_["stars"] !== "") {
	levels.push(ping_)
	let l = list.split("<string>").slice(1, -1)
	for (let i = 0; i < l.length; i++) {
		l[i] = l[i].split("</string>")[0]
	}
	for (let i = 0; i < l.length; i++) {
		l[i] = "<key>" + (i + 1) + "</key>\n<string>" + l[i] + "</string>"
	}
	l.push("<key>" + levels.length + "</key>\n<string></string>")
	let l = l.join("\n")
	let list = slices[0] + l + slices[1]
	fs.writeFileSync(path + ".levels", JSON.stringify(levels), "utf8")
	fs.writeFileSync(path + "Resources\\LevelData.plist", list, "utf8")
} else {
	console.log("There was an error trying to create your level. Either your level name or star value is incompatable with Geometry Dash.")
}
process.exit(0)
