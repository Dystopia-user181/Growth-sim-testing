function unplant(amt=1) {
	amt = new Decimal(amt);
	if (player.plantUnpicked.lt(amt)) return;
	player.plantUnpicked = player.plantUnpicked.sub(amt);
	player.plantPicked = player.plantPicked.add(amt);
	sell(amt.mul(player.automator.sellPlant));
	player.tutorial.unlockedSell = true;
	if (player.plantPicked.gt(300)) player.tutorial.unlockedHoneybee = true;
}
setInterval(function () {
	player.plantUnpicked = player.plantUnpicked.add(1).add(player.plantUnpicked.min(player.bee).mul(player.plantpow.add(1).pow(1.1)));
	if (player.plantUnpicked.gt(300)) player.tutorial.unlockedHoneybee = true;
	var prevHoney = player.honey;
	player.honey = player.honey.add(player.bee.min(player.plantUnpicked).pow(0.5).mul(player.honeycomb.pow(0.3).add(1).mul(player.plantpow.add(1).pow(1.1))));
	prevHoney = player.honey.sub(prevHoney);
	sellHoney(player.automator.sellHoney);
	player.honeycomb = player.honeycomb.add(player.hive.total.floor().pow(2).mul(player.plantpow.add(1).pow(1.1)));
	addHoneyBee();
	grow();
	player.container.total = player.container.total.add(player.factories);
	player.hive.total = player.hive.total.add(player.factories.mul(0.5));
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
	if (player.plantPicked.lt(amt)) return;
	player.plantPicked = player.plantPicked.sub(amt);
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