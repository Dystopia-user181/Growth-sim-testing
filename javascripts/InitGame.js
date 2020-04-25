var player = {
	money: new Decimal(1),
	hacks: [new Decimal(0), new Decimal(0)],
	hackers: [new Decimal(0), new Decimal(0)],
	trainers: [new Decimal(0), new Decimal(0)],
	masters: [new Decimal(0), new Decimal(0)],
	efficiencies: new Decimal(0),
	efficiency: new Decimal(1),
	computer: [new Decimal(1), new Decimal(0), new Decimal(0), new Decimal(0)],
	resets: new Decimal(0),
	matrixPoints: new Decimal(0),
	matrixStat: new Decimal(0),
	timePlayed: (new Date()).getTime(),
	notation: "Scientific",
	theme: "Light",
	neon: false
}
var initPlayer = {
	money: new Decimal(1),
	hacks: [new Decimal(0), new Decimal(0)],
	hackers: [new Decimal(0), new Decimal(0)],
	trainers: [new Decimal(0), new Decimal(0)],
	masters: [new Decimal(0), new Decimal(0)],
	efficiencies: new Decimal(0),
	efficiency: new Decimal(1),
	computer: [new Decimal(1), new Decimal(0), new Decimal(0), new Decimal(0)],
	resets: new Decimal(0),
	matrixPoints: new Decimal(0),
	matrixStat: new Decimal(0),
	timePlayed: (new Date()).getTime(),
	notation: "Scientific",
	theme: "Light",
	neon: false
}
var costs = {
	hacks: new Decimal(1),
	hackers: new Decimal(100),
	trainers: new Decimal("1e4"),
	masters: new Decimal("1e6"),
	efficiency: new Decimal("1e3"),
	computer: [new Decimal(1e3), new Decimal(5e4), new Decimal(2e3), new Decimal(1e4)],
	unlock: new Decimal(10)
}
var multi = {
	hacks: new Decimal(1),
	hackers: new Decimal(1),
	trainers: new Decimal(1),
	masters: new Decimal(1)
}
var maxHacks = new Decimal(100);
function $(element) {return document.getElementById(element);}
$("options").style.display = "none";
$("computer").style.display = "none";
$("corruptPreBreak").style.display = "none";