const D = d => {return new Decimal(d);}
const initPlayer = {
	money: D(20),
	automoney: D(0),
	plants: {
		picked: D(0),
		field: D(200)
	},
	bees: D(0),
	honey: D(0),
	cvt: {
		bought: D(0),
		total: D(0),
		level: D(0)
	},
	plantium: D(0),
	plantiumplantamt: D(1e15),
	tmpplantiumplantamt: "1e15",
	onplantiumgain: D(0),
	plantiumprocess: 2,
	plantiumupgrades: 0,
	cvtupgrades: 0,
	plantpow: D(0),
	generators: D(0),
	batteries: D(0),
	factories: D(0),
	machines: D(0),
	hives: {
		bought: D(0),
		total: D(0),
		level: D(0)
	},
	honeycombs: D(0),
	combstructures: [D(0), D(0), D(0), D(0), D(0)],
	intelligence: D(0),
	queens: {
		amt: D(0),
		honey: D(0),
		beeproduction: 1,
		upgrades: 0
	},
	automator: {
		sellPlant: "0",
		sellHoney: "0",
		buycvt: false,
		buycvtup: false,
		buycvtr: "0",
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
var ctx = document.getElementById("c").getContext("2d");
function mainGameLoop(ticks=0.05) {
	lastTick = thisTick;
	thisTick = new Date().getTime();
	player.plants.field = player.plants.field.add(ticks).add(player.plants.field.min(player.bees).mul(vm.plantpowbuff).mul(ticks));
	if (player.plants.field.gt(300) && player.tutorial.unlockedSell) player.tutorial.unlockedHoneybee = true;
	if (player.bees.gt(1e6)) player.tutorial.unlockedQueen = true;
	var prevHoney = player.honey;
	player.honey = player.honey.add(vm.hps.mul(ticks));
	prevHoney = player.honey.sub(prevHoney);
	sellHoney(prevHoney.mul(player.automator.sellHoney));
	player.honeycombs = player.honeycombs.add(vm.comps.mul(ticks));
	if (player.tutorial.unlockedHoneybee) {
		var softcap = (vm.beecapped ? player.bees.pow(0.7) : 1)
		player.bees = player.bees.add(player.plants.field.pow(0.55).mul(player.honeycombs.pow(0.3).add(1)).mul(vm.plantpowbuff).mul(ticks).mul(Math.pow(player.queens.beeproduction, 6)).div(softcap).mul(vm.pus[5].bought?player.queens.amt:1)).min(player.plants.field.div(50).mul(player.honeycombs.pow(Decimal.div(1, player.honeycombs.add(100).log(100))).add(1)));
	}
	var prevPlants = player.plants.picked;
	player.plants.picked = player.plants.picked.add(vm.pps.mul(ticks));
	prevPlants = player.plants.picked.sub(prevPlants);
	sell(prevPlants.mul(player.automator.sellPlant));
	if (player.queens.beeproduction < 1) player.queens.beeproduction += 0.0006;
	else player.queens.beeproduction = 1;
	if (player.plants.picked.gt(300)) player.tutorial.unlockedHoneybee = true;
	player.cvt.total = player.cvt.total.add(player.factories.mul(0.01));
	player.hives.total = player.hives.total.add(player.factories.mul(0.005));
	player.plantpow = player.plantpow.add(vm.plantpowps.mul(ticks));
	player.queens.honey = player.queens.honey.sub(Decimal.pow(10, player.queens.amt).sub(1).mul(1e3)).max(0);
	if (player.automator.autoplantium) makePlantium();
	if (player.automator.autoqueen) queenReset();
	if (player.automator.autoupgrades) {
		buyMaxCvtUp(player.money, "cvt");
		buyMaxCvtUp(player.money, "hives");
	}
}
setInterval(function () {
	mainGameLoop((thisTick-lastTick)/1000);
}, 50);