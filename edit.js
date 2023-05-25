const fs = require("fs")
const zlib = require("zlib")
const path = fs.readFileSync("path.lnk", "utf8").replace(/"/g, "").replace(/\//g, "\\").slice(0, -2) + "\\"
const levels = JSON.parse(fs.readFileSync(path + ".levels", "utf8"))
const slices = JSON.parse(fs.readFileSync("slices.json", "utf8"))
const ping_ = JSON.parse(fs.readFileSync("ping_.json", "utf8"))
function addData(data) {
	let list = fs.readFileSync(path + "Resources\\LevelData.plist", "utf8")
	let l = list.split("<string>").slice(1, -1)
	for (let i = 0; i < l.length; i++) {
		l[i] = l[i].split("</string>")[0]
	}
	let c = 1
	data = data.split(";")
	for (let i = 0; i < data.length; i++) {
		if (data[i].includes("1,1329")) {
			data[i] = data[i].replace("1,1329", "1,142") + ",12," + c++
		}
	}
	l[ping_[0] - 1] = data.join(";")
	for (let i = 0; i < l.length; i++) {
		l[i] = "<key>" + (i + 1) + "</key>\n<string>" + l[i] + "</string>"
	}
	let list_ = slices[0] + l.join("\n") + slices[1]
	return list_
}
function decode(data) {
	return zlib.unzipSync(Buffer.from(data, "base64")).toString()
}
if (ping_[0] <= levels.length && ping_[0] > 0) {
	if (ping_[1] === "name") {
		ping_[2] = ping_[2].replace(/[^a-zA-Z0-9 ]/g, "")
		if (ping_[2] !== "") {
			levels[ping_[0] - 1]["name"] = ping_[2]
			fs.writeFileSync(path + ".levels", JSON.stringify(levels), "utf8")
		}
		process.exit(0)
	}
	if (ping_[1] === "rating") {
		levels[ping_[0] - 1]["difficulty"] = ping_[2]
		fs.writeFileSync(path + ".levels", JSON.stringify(levels), "utf8")
		process.exit(0)
	}
	if (ping_[1] === "stars") {
		ping_[2] = ping_[2].replace(/[^0-9\-]/g, "")
		if (ping_[2] !== "") {
			ping_[2] = Number(ping_[2])
			levels[ping_[0] - 1]["stars"] = ping_[2]
			fs.writeFileSync(path + ".levels", JSON.stringify(levels), "utf8")
		}
		process.exit(0)
	}
	if (ping_[1] === "song") {
		if (!ping_[2].includes(".mp3")) {
			ping_[2] += ".mp3"
		}
		levels[ping_[0] - 1]["song"] = ping_[2]
		fs.writeFileSync(path + ".levels", JSON.stringify(levels), "utf8")
		process.exit(0)
	}
	if (ping_[1] === "data") {
		if (ping_[2] === "id" || ping_[2] === "dlid") {
			(async () => {
				let params = new URLSearchParams()
				params.append("gameVersion", 21)
				params.append("binaryVersion", 35)
				params.append("gdw", 0)
				params.append("levelID", ping_[3])
				params.append("inc", 0)
				params.append("extras", 0)
				params.append("secret", "Wmfd2893gb7")
				let res = await fetch("http://www.boomlings.com/database/downloadGJLevel22.php", {headers: {"Content-Type": "application/x-www-form-urlencoded", "user-agent": ""}, body: params, method: "POST"}).then(res => {return res.text()})
				let data = decode(res.split(":")[7])
				if (data !== -1) {
					if (ping_[2] === "id") {
						fs.writeFileSync(path + "Resources\\LevelData.plist", addData(data), "utf8")
					}
					if (ping_[2] === "dlid") {
						fs.writeFileSync("./levels/" + ping_[3] + ".txt", data, "utf8")
					}
				}
				process.exit(0)
			})()
		} else {
			let data = fs.readFileSync(ping_[3].replace(/"/g, "").replace(/\//g, "\\"), "utf8")
			fs.writeFileSync(path + "Resources\\LevelData.plist", addData(data), "utf8")
			process.exit(0)
		}
	}
} else {
	process.exit(0)
}
