function unplant() {
	if (player.plantUnpicked.lte(0)) return;
	player.plantUnpicked = player.plantUnpicked.sub(1);
	player.plantPicked = player.plantPicked.add(1);
	player.tutorial.unlockedSell = true;
	if (player.plantPicked.gt(1000)) player.tutorial.unlockedHoneybee = true;
}
setInterval(function () {
	player.plantUnpicked = player.plantUnpicked.add(1).add(player.plantUnpicked.min(player.bee));
	if (player.plantUnpicked.gt(1000)) player.tutorial.unlockedHoneybee = true;
	var prevHoney = player.honey;
	player.honey = player.honey.add(player.bee.min(player.plantUnpicked).pow(0.7).mul(player.honeycomb.pow(0.6).add(1)));
	prevHoney = player.honey.sub(prevHoney);
	player.money = player.money.add(prevHoney.mul(player.automator.sellHoney).mul(Decimal.pow(1.1, player.marketing).mul(plantSell/200)));
	player.honey = player.honey.sub(prevHoney.mul(player.automator.sellHoney));
	if (player.automator.buycontainerup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycontainer) {
		buyMaxCvt(player.money.div(2));
		buyMaxHive(player.money);
	}
}, 1000);
function sell() {
	if (player.plantPicked.lte(0)) return;
	player.plantPicked = player.plantPicked.sub(1);
	player.money = player.money.add(Decimal.pow(1.1, player.marketing).mul(plantSell/5));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.automator.buycontainerup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycontainer) {
		buyMaxCvt(player.money.div(2));
		buyMaxHive(player.money);
	}
}