var player = {
	money: new Decimal(1),
	hacks: [new Decimal(0), new Decimal(0)],
	hackers: [new Decimal(0), new Decimal(0)],
	trainers: [new Decimal(0), new Decimal(0)],
	masters: [new Decimal(0), new Decimal(0)],
	efficiencies: new Decimal(0),
	efficiency: new Decimal(1),
	resets: new Decimal(0),
	matrixPoints: new Decimal(0),
	matrixStat: new Decimal(0),
	timePlayed: (new Date()).getTime(),
	notation: "Scientific",
	theme: "Light"
}
var initPlayer = {
	money: new Decimal(1),
	hacks: [new Decimal(0), new Decimal(0)],
	hackers: [new Decimal(0), new Decimal(0)],
	trainers: [new Decimal(0), new Decimal(0)],
	masters: [new Decimal(0), new Decimal(0)],
	efficiencies: new Decimal(0),
	efficiency: new Decimal(1),
	resets: new Decimal(0),
	matrixPoints: new Decimal(0),
	matrixStat: new Decimal(0),
	timePlayed: (new Date()).getTime(),
	notation: "Scientific",
	theme: "Light"
}
var costs = {
	hacks: new Decimal(1),
	hackers: new Decimal(100),
	trainers: new Decimal("1e4"),
	masters: new Decimal("1e6"),
	efficiency: new Decimal("1e3"),
	unlock: new Decimal(10)
}
var multi = {
	hacks: new Decimal(1),
	hackers: new Decimal(1),
	trainers: new Decimal(1),
	masters: new Decimal(1)
}
document.getElementById("inGame").style.display = "none";
document.getElementById("options").style.display = "none";
document.getElementById("away").style.display = "none";
document.getElementById("corruptPreBreak").style.display = "none";