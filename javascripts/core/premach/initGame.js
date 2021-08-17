const D = (d, log=false) => {if (log) console.log(d);return new Decimal(d);}
const batteryTypes = ["copper", "silver", "connected", "chained"];
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
	batteryBox: {
		copper: D(0),
		silver: D(0),
		connected: D(0),
		chained: D(0)
	},
	selectedBatteryCell: "copper",
	infoBatCell: "",
	batteryUnlocks: 0,
	batteryArray: [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]],
	expansions: 0,
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
		madeQueen: false,
		unlockedMarketing: false,
		unlockedMachine: false,
		madeFirstPlantium: false
	},
	option: {
		theme: "Dark",
		notation: "Scientific",
		autosave: true
	},
	display: {
		lore: true
	},
	navigation: {
		tab: "Plants"
	},
	version: "1.0.0.0-balancing",
	devSpeed: 1
};
var lastTick = new Date().getTime();
var thisTick = new Date().getTime();
Object.seal(initPlayer);
var player = initPlayer;
function getnff(bool) {
	if (bool) return "ON"; else return "OFF";
}
function mainGameLoop(ticks=0.05) {
	lastTick = thisTick;
	thisTick = new Date().getTime();

	ticks *= player.devSpeed;
	if (window.vm) ticks *= 1-vm.qus[7].bought;
	if (isNaN(ticks)) ticks = 0;

	player.plants.field = player.plants.field.add(ticks).add(player.plants.field.min(player.bees).mul(vm.plantpowbuff).mul(ticks).mul(vm.hcs[0].boost));
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

	if (player.queens.beeproduction < 1) player.queens.beeproduction += 0.05*ticks;
	else player.queens.beeproduction = 1;

	if (player.plants.picked.gt(300)) player.tutorial.unlockedHoneybee = true;

	player.cvt.total = player.cvt.total.add(player.factories.mul(0.4).mul(ticks));
	player.hives.total = player.hives.total.add(player.factories.mul(0.2).mul(ticks));

	player.plantpow = player.plantpow.add(vm.plantpowps.mul(ticks));

	player.queens.honey = player.queens.honey.sub(Decimal.pow(10, player.queens.amt).sub(1).mul(1e3).mul(ticks).mul(10)).max(0);

	if (player.automator.autoplantium) makePlantium();
	if (player.automator.autoqueen) queenReset();
	if (player.automator.buycvt) {
		buyMaxCvt(player.automator.buycvtratio?player.money.mul(player.automator.buycvtr).div(1.9):player.money.div(1.9), "cvt");
		buyMaxCvt(player.automator.buycvtratio?player.money.mul(player.automator.buycvtr):player.money, "hives");
		buyMaxCvt(player.automator.buycvtratio?player.money.mul(player.automator.buycvtr):player.money, "cvt");
	}
	if (player.automator.autoupgrades) {
		buyMaxCvtUp(player.money, "cvt");
		buyMaxCvtUp(player.money, "hives");
	}

	if (player.plantiumprocess > 2) {
		if (vm.pus[2].bought) {
			if (player.honey.gte(player.plantiumplantamt.mul(ticks))&&player.plants.picked.gte(player.plantiumplantamt.mul(ticks*10))) {
				player.plantiumprocess += 980*ticks;
				player.plants.picked = player.plants.picked.sub(player.onplantiumgain.mul(player.plantiumplantamt.mul(10*ticks))).max(0);
				player.honey = player.honey.sub(player.onplantiumgain.mul(player.plantiumplantamt.mul(ticks))).max(0);
			}
		} else {
			if (player.honey.gte(player.plantiumplantamt.mul(ticks/200))&&player.plants.picked.gte(player.plantiumplantamt.mul(ticks/20))) {
				player.plantiumprocess += 9.8*ticks;
				player.plants.picked = player.plants.picked.sub(player.onplantiumgain.mul(player.plantiumplantamt.mul(ticks/20)));
				player.honey = player.honey.sub(player.onplantiumgain.mul(player.plantiumplantamt.mul(ticks/200)));
			}
		}
		if (player.plantiumprocess > 100) {
			if (!vm.pus[1].bought) prestige(["plantium", "machines", "generators", "plantiumupgrades", "onplantiumgain", 
				"batteries", "batteryUnlocks", "batteryArray", "selectedBatteryCell"]);
			player.plantium = player.plantium.add(player.onplantiumgain.mul(Decimal.pow(1.5, player.plantiumplantamt.add(1).log10()-15)));
			player.plantiumprocess = 2;
			player.tutorial.madeFirstPlantium = true;
		}
	}
	var cellUnlocks = 0;
	cellUnlocks += player.batteries.gte(6);
	cellUnlocks += player.bees.gte(2.222e222)&&vm.cellUnlocks.silver.unlocked;
	player.batteryUnlocks = Math.max(player.batteryUnlocks, cellUnlocks);
}
function simulateTime(ticks) {
	var iterations = Math.min(1000, Math.round(ticks*20));
	for (var i = 0; i < iterations; i++) {
		mainGameLoop(ticks/iterations);
	}
}
setInterval(function () {
	simulateTime((new Date().getTime()-lastTick)/1000);
}, 50);