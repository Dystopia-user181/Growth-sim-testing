var initPlayer = {
	money: new Decimal(20),
	plantUnpicked: new Decimal(200),
	plantPicked: new Decimal(0),
	bee: new Decimal(0),
	honey: new Decimal(0),
	container: new Decimal(0),
	containerLevel: new Decimal(0),
	plantium: new Decimal(0),
	machine: 0,
	marketing: new Decimal(0),
	hive: new Decimal(0),
	honeycomb: new Decimal(0),
	automator: {
		sellPlant: 0,
		sellHoney: 0,
		buycontainer: false,
		buycontainerup: false,
		buymarketing: false
	},
	automatorUnlocked: {
		sellPlant: false,
		sellHoney: false,
		buycontainer: false,
		buycontainerup: false,
		buymarketing: false
	},
	tutorial: {
		unlockedSell: false,
		unlockedPots: false,
		unlockedHoneybee: false,
		unlockedMarketing: false
	},
	option: {
		invert: false,
		autosave: true
	},
	version: "0.0.0.4"
};
var player = initPlayer;
var plantSell = 5;
function $(elmt) {
	return document.getElementById(elmt);
}
function getnff(bool) {
	if (bool) return "ON"; else return "OFF";
}