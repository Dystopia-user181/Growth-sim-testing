function unplant(amt=1) {
	amt = new Decimal(amt);
	if (player.plants.field.lt(amt)) return;
	player.plants.field = player.plants.field.sub(amt);
	player.plants.picked = player.plants.picked.add(amt);
	sell(amt.mul(player.automator.sellPlant));
	if (player.plants.picked.gt(30)) player.tutorial.unlockedSell = true;
	if (player.plants.picked.gt(300) && player.tutorial.unlockedSell) player.tutorial.unlockedHoneybee = true;
}
setInterval(function () {
	player.plants.field = player.plants.field.add(0.05).add(player.plants.field.min(player.bees).mul(vm.plantpowbuff).mul(0.05));
	if (player.plants.field.gt(300) && player.tutorial.unlockedSell) player.tutorial.unlockedHoneybee = true;
	if (player.bees.gt(1e6)) player.tutorial.unlockedQueen = true;
	var prevHoney = player.honey;
	player.honey = player.honey.add(vm.hps.mul(0.05));
	prevHoney = player.honey.sub(prevHoney);
	sellHoney(prevHoney.mul(player.automator.sellHoney));
	player.honeycombs = player.honeycombs.add(vm.comps.mul(0.05));
	if (player.tutorial.unlockedHoneybee) {
		var softcap = (vm.beecapped ? player.bees.pow(0.7) : 1)
		player.bees = player.bees.add(player.plants.field.pow(0.55).mul(player.honeycombs.pow(0.3).add(1)).mul(vm.plantpowbuff).mul(0.05).mul(Math.pow(player.queens.beeproduction, 6)).div(softcap)).min(player.plants.field.div(50).mul(player.honeycombs.pow(Decimal.div(1, player.honeycombs.add(100).log(100))).add(1)));
	}
	var prevPlants = player.plants.picked;
	player.plants.picked = player.plants.picked.add(vm.pps.mul(0.05));
	prevPlants = player.plants.picked.sub(prevPlants);
	sell(prevPlants.mul(player.automator.sellPlant));
	if (player.queens.beeproduction < 1) player.queens.beeproduction += 0.0006;
	else player.queens.beeproduction = 1;
	if (player.plants.picked.gt(300)) player.tutorial.unlockedHoneybee = true;
	if (player.automator.buycvtup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycvt) buyMaxCvt(player.money.div(1.5));
	if (player.automator.buycvt) buyMaxHive(player.money);
	player.cvt.total = player.cvt.total.add(player.factories.mul(0.01));
	player.hives.total = player.hives.total.add(player.factories.mul(0.005));
	player.plantpow = player.plantpow.add(player.generators.sub(vm.pus[3].bought?0:player.factories.div(2)).mul(0.005));
	player.queens.honey = player.queens.honey.sub(Decimal.pow(10, player.queens.amt).sub(1).mul(1e3)).max(0);
	if (player.automator.autoplantium) makePlantium();
}, 50);
function sell(amt = 1) {
	amt = new Decimal(amt);
	if (player.plants.picked.lt(amt)) return;
	player.plants.picked = player.plants.picked.sub(amt);
	player.money = player.money.add(amt);
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e14) && !player.tutorial.unlockedMachine) {
		player.navigation.tab = "Machine";
		let tmp = player.option.theme;
		player.option.theme = "a";
		setTimeout(()=>player.option.theme = tmp, 30);
	}
	if (player.money.gte(1e14)) player.tutorial.unlockedMachine = true;
	if (player.automator.buycvt) {
		buyMaxCvt(player.automator.buycvtratio?player.automoney:player.money);
		buyMaxHive(player.automator.buycvtratio?player.automoney:player.money);
	}
	if (player.automator.buycvtratio) {
		player.automoney = player.automoney.add(amt.mul(player.automator.buycvtr));
	}
}