var initPlayer = {
	money: new Decimal(20),
	plants: {
		picked: new Decimal(0),
		field: new Decimal(0)
	},
	bees: new Decimal(0),
	honey: new Decimal(0),
	cvt: {
		bought: new Decimal(0),
		total: new Decimal(0),
		level: new Decimal(0)
	},
	plantium: new Decimal(0),
	plantiumprocess: false,
	plantpow: new Decimal(0),
	generators: new Decimal(0),
	factories: new Decimal(0),
	machines: new Decimal(0),
	marketing: new Decimal(0),
	hives: {
		bought: new Decimal(0),
		total: new Decimal(0)
	},
	honeycombs: new Decimal(0),
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
		unlockedMarketing: false,
		unlockedMachine: false,
		madeFirstPlantium: false
	},
	option: {
		invert: false,
		autosave: true
	},
	display: {
		lore: true
	},
	navigation: {
		tab: "Plants"
	},
	version: "0.0.0.6"
};
var player = initPlayer;
function $(elmt) {
	return document.getElementById(elmt);
}
function getnff(bool) {
	if (bool) return "ON"; else return "OFF";
}