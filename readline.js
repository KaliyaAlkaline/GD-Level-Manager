const fs = require("fs")
const ping_ = JSON.parse(fs.readFileSync("ping_.json"))
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
})
readline.question(ping_.prompt, in_ => {
	fs.writeFileSync("ping_.json", in_)
	readline.close()
	process.exit(0)
})