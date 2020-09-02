var initPlayer = {
	money: new Decimal(20),
	plantUnpicked: new Decimal(200),
	plantPicked: new Decimal(0),
	bee: new Decimal(0),
	honey: new Decimal(0),
	container: {
		bought: new Decimal(0),
		total: new Decimal(0)
	},
	containerLevel: new Decimal(0),
	plantium: new Decimal(0),
	plantiumprocess: 2,
	plantpow: new Decimal(0),
	generators: new Decimal(0),
	factories: new Decimal(0),
	machine: 0,
	marketing: new Decimal(0),
	hive: {
		bought: new Decimal(0),
		total: new Decimal(0)
	},
<<<<<<< Updated upstream
	honeycomb: new Decimal(0),
	automator: {
		sellPlant: 0,
		sellHoney: 0,
		buycontainer: false,
		buycontainerup: false,
=======
	honeycombs: new Decimal(0),
	queens: {
		amt: new Decimal(0),
		honey: new Decimal(0),
		beeproduction: 1,
		upgrades: []
	},
	automator: {
		sellPlant: "0",
		sellHoney: "0",
		buycvt: false,
		buycvtup: false,
>>>>>>> Stashed changes
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
		unlockedQueen: false,
		unlockedMarketing: false,
		unlockedMachine: false,
		madeFirstPlantium: false
	},
	option: {
		theme: "Dark",
		font: "Monospace",
		notation: "Scientific",
		autosave: true
	},
	display: {
		lore: true
	},
	navigation: {
		tab: "Plants"
	},
	version: "1.0.0.0-vue"
};
var player = initPlayer;
function $(elmt) {
	return document.getElementById(elmt);
}
function getnff(bool) {
	if (bool) return "ON"; else return "OFF";
}