function unplant(amt=1) {
	amt = new Decimal(amt);
	if (player.plantUnpicked.lt(amt)) return;
	player.plantUnpicked = player.plantUnpicked.sub(amt);
	player.plantPicked = player.plantPicked.add(amt);
	sell(amt.mul(player.automator.sellPlant));
	player.tutorial.unlockedSell = true;
	if (player.plantPicked.gt(1000)) player.tutorial.unlockedHoneybee = true;
}
setInterval(function () {
	player.plantUnpicked = player.plantUnpicked.add(1).add(player.plantUnpicked.min(player.bee));
	if (player.plantUnpicked.gt(1000)) player.tutorial.unlockedHoneybee = true;
	var prevHoney = player.honey;
	player.honey = player.honey.add(player.bee.min(player.plantUnpicked).pow(0.3).mul(player.honeycomb.pow(0.3).add(1)));
	prevHoney = player.honey.sub(prevHoney);
	sellHoney(player.automator.sellHoney);
	if (player.automator.buycontainerup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycontainer) {
		buyMaxCvt(player.money.div(2));
		buyMaxHive(player.money);
	}
}, 1000);
function sell(amt = 1) {
	amt = new Decimal(amt);
	if (player.plantPicked.lt(amt)) return;
	player.plantPicked = player.plantPicked.sub(amt);
	player.money = player.money.add(Decimal.pow(1.5, player.marketing).mul(amt));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e15)) player.tutorial.unlockedMachine = true;
	if (player.automator.buycontainerup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycontainer) {
		buyMaxCvt(player.money.div(2));
		buyMaxHive(player.money);
	}
}