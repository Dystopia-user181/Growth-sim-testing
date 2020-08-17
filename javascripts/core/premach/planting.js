function unplant(amt=1) {
	amt = new Decimal(amt);
	if (player.plants.field.lt(amt)) return;
	player.plants.field = player.plants.field.sub(amt);
	player.plants.picked = player.plants.picked.add(amt);
	sell(amt.mul(player.automator.sellPlant));
	player.tutorial.unlockedSell = true;
	if (player.plants.picked.gt(300)) player.tutorial.unlockedHoneybee = true;
}
setInterval(function () {
	player.plants.field = player.plants.field.add(1).add(player.plants.field.min(player.bees).mul(player.plantpow.add(1).pow(1.1)));
	if (player.plants.field.gt(300)) player.tutorial.unlockedHoneybee = true;
	var prevHoney = player.honey;
	player.honey = player.honey.add(player.bees.min(player.plants.field).pow(0.5).mul(player.honeycombs.pow(0.3).add(1).mul(player.plantpow.add(1).pow(1.1))));
	prevHoney = player.honey.sub(prevHoney);
	sellHoney(player.automator.sellHoney);
	player.honeycombs = player.honeycombs.add(player.hives.total.floor().pow(2).mul(player.plantpow.add(1).pow(1.1)));
	addHoneyBee();
	grow();
	player.cvt.total = player.cvt.total.add(player.factories.mul(0.2));
	player.hives.total = player.hives.total.add(player.factories.mul(0.1));
	if (player.automator.buycontainerup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycontainer) {
		if (player.tutorial.madeFirstPlantium) {
			buyMaxFactory(player.money.div(2));
		}
		buyMaxCvt(player.money.div(2));
		buyMaxHive(player.money);
	}
}, 1000);
function sell(amt = 1) {
	amt = new Decimal(amt);
	if (player.plants.picked.lt(amt)) return;
	player.plants.picked = player.plants.picked.sub(amt);
	player.money = player.money.add(Decimal.pow(1.6, player.marketing).mul(amt));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e14) && !player.tutorial.unlockedMachine) player.navigation.tab = "Machine";
	if (player.money.gte(1e14)) player.tutorial.unlockedMachine = true;
	if (player.automator.buycontainerup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycontainer) {
		buyMaxCvt(player.money.div(2));
		buyMaxHive(player.money);
	}
}