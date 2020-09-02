function unplant(amt=1) {
	amt = new Decimal(amt);
	if (player.plants.field.lt(amt)) return;
	player.plants.field = player.plants.field.sub(amt);
	player.plants.picked = player.plants.picked.add(amt);
	sell(amt.mul(player.automator.sellPlant));
	player.tutorial.unlockedSell = true;
	if (player.plants.picked.gt(300) && player.tutorial.unlockedSell) player.tutorial.unlockedHoneybee = true;
}
setInterval(function () {
	player.plants.field = player.plants.field.add(0.05).add(player.plants.field.min(player.bees).mul(player.plantpow.add(1).pow(1.1)).mul(0.05));
	if (player.plants.field.gt(300) && player.tutorial.unlockedSell) player.tutorial.unlockedHoneybee = true;
	var prevHoney = player.honey;
	player.honey = player.honey.add(player.bees.min(player.plants.field).pow(0.5).mul(player.honeycombs.pow(0.3).add(1).mul(player.plantpow.add(1).pow(1.1))).mul(0.05));
	prevHoney = player.honey.sub(prevHoney);
	sellHoney(player.automator.sellHoney);
	player.honeycombs = player.honeycombs.add(player.hives.total.floor().pow(2).mul(player.plantpow.add(1).pow(1.1)).mul(0.05));
	if (player.tutorial.unlockedHoneybee) {
		player.bees = player.bees.add(player.plants.field.pow(0.55).mul(player.honeycombs.pow(0.3).add(1)).mul(player.plantpow.add(1).pow(1.1)).mul(0.05).mul(Math.pow(player.queens.beeproduction, 6))).min(player.plants.field.div(50).mul(player.honeycombs.pow(Decimal.div(1, player.honeycombs.add(100).log(100))).add(1)));
	}
	var prevPlants = player.plants.picked;
	player.plants.picked = player.plants.picked.add(player.plants.picked.max(1).min(player.cvt.total.floor()).pow(player.cvt.level.div(2).add(1)).mul(player.honey.add(1).pow(0.2)).mul(player.plantpow.add(1).pow(1.1)).mul(0.05));
	prevPlants = player.plants.picked.sub(prevPlants);
	sell(prevPlants.mul(player.automator.sellPlant));
	if (player.queens.beeproduction < 1) player.queens.beeproduction += 0.0006;
	else player.queens.beeproduction = 1;
	if (player.plants.picked.gt(300)) player.tutorial.unlockedHoneybee = true;
	if (player.automator.buycvtup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycvt) buyMaxCvt(player.money);
	if (player.automator.buycvt) buyMaxHive(player.money);
	player.cvt.total = player.cvt.total.add(player.factories.mul(0.2));
	player.hives.total = player.hives.total.add(player.factories.mul(0.1));
	if (player.automator.buycvt) {
		buyMaxCvt(player.money);
		buyMaxHive(player.money);
	}
}, 50);
function sell(amt = 1) {
	amt = new Decimal(amt);
	if (player.plants.picked.lt(amt)) return;
	player.plants.picked = player.plants.picked.sub(amt);
	player.money = player.money.add(Decimal.pow(1.5, player.marketing).mul(amt));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e14) && !player.tutorial.unlockedMachine) player.navigation.tab = "Machine";
	if (player.money.gte(1e14)) player.tutorial.unlockedMachine = true;
	if (player.automator.buycontainer) {
		buyMaxCvt(player.money);
		buyMaxHive(player.money);
	}
}
