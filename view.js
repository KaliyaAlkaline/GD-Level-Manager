const fs = require("fs")
const path = fs.readFileSync("path.lnk", "utf8").replace(/"/g, "").replace(/\//g, "\\").slice(0, -2) + "\\"
const levels = JSON.parse(fs.readFileSync(path + ".levels", "utf8"))
function diff(n) {
	if (n === 1) {return "Easy"}
	if (n === 2) {return "Normal"}
	if (n === 3) {return "Hard"}
	if (n === 4) {return "Harder"}
	if (n === 5) {return "Insane"}
	if (n === 6) {return "Demon"}
}
for (let i = 0; i < levels.length; i++) {
	var g = ""
	if (levels[i]["stars"] !== 1) {
		var g = "s"
	}
	console.log((i + 1) + ". " + levels[i]["name"] + " - " + diff(levels[i]["difficulty"]) + " - " + levels[i]["stars"] + " Star" + g + " - " + levels[i]["song"])
}
process.exit(0)