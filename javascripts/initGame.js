var initPlayer = {
	money: new Decimal(0),
	plantUnpicked: new Decimal(200),
	plantPicked: new Decimal(0),
	bee: new Decimal(0),
	honey: new Decimal(0),
	container: new Decimal(0),
	containerLevel: 0,
	plantium: new Decimal(0),
	machine: 0,
	tutorial: {
		unlockedSell: false,
		unlockedPots: false,
		unlockedHoneybee: false
	},
	version: "0.0.0.3"
};
var player = initPlayer;
var plantSell = 5;
function $(elmt) {
	return document.getElementById(elmt);
}