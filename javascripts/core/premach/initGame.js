const initPlayer = {
	money: new Decimal(20),
	automoney: new Decimal(0),
	plants: {
		picked: new Decimal(0),
		field: new Decimal(200)
	},
	bees: new Decimal(0),
	honey: new Decimal(0),
	cvt: {
		bought: new Decimal(0),
		total: new Decimal(0),
		level: new Decimal(0)
	},
	plantium: new Decimal(0),
	plantiumplantamt: new Decimal(1e15),
	tmpplantiumplantamt: "1e15",
	onplantiumgain: new Decimal(0),
	plantiumprocess: 2,
	plantiumupgrades: 0,
	cvtupgrades: 0,
	plantpow: new Decimal(0),
	generators: new Decimal(0),
	batteries: new Decimal(0),
	factories: new Decimal(0),
	machines: new Decimal(0),
	hives: {
		bought: new Decimal(0),
		total: new Decimal(0),
		level: new Decimal(0)
	},
	honeycombs: new Decimal(0),
	combstructures: [0, 0, 0, 0, 0],
	queens: {
		amt: new Decimal(0),
		honey: new Decimal(0),
		beeproduction: 1,
		upgrades: 0
	},
	automator: {
		sellPlant: "0",
		sellHoney: "0",
		buycvt: false,
		buycvtup: false,
		buycvtr: 0,
		buycvtratio: false,
		autoupgrades: false,
		autoplantium: false,
		autoqueen: false
	},
	automatorUnlocked: {
		sellPlant: false,
		sellHoney: false,
		buycvt: false,
		buycvtup: false,
		autoupgrades: false,
		autoplantium: false,
		autoqueen: false
	},
	tutorial: {
		unlockedSell: false,
		unlockedPot: false,
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
var lastTick = new Date().getTime();
var thisTick = new Date().getTime();
Object.seal(initPlayer);
var player = initPlayer;
function getnff(bool) {
	if (bool) return "ON"; else return "OFF";
}