function addHoneyBee() {
	if (player.tutorial.unlockedHoneybee) {
		player.bee = player.bee.add(player.plantUnpicked.pow(0.55)).min(player.plantUnpicked.div(50));
	}
}
setInterval(addHoneyBee, 2000);
function sellHoney() {
	if (player.honey.lt(2)) return;
	player.honey = player.honey.sub(1);
	player.money = player.money.add(Decimal.pow(1.1, player.marketing).mul(plantSell/2));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(1000)) player.tutorial.unlockedMarketing = true;
}