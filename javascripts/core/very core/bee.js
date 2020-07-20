function addHoneyBee() {
	if (player.tutorial.unlockedHoneybee) {
		player.bee = player.bee.add(player.plantUnpicked.pow(0.55).mul(player.honeycomb.pow(0.3).add(1))).min(player.plantUnpicked.div(50).mul(player.honeycomb.pow(Decimal.div(1, player.honeycomb.add(100).log(100))).add(1)));
	}
}
setInterval(addHoneyBee, 2000);
function sellHoney() {
	if (player.honey.lt(100)) return;
	player.honey = player.honey.sub(100);
	player.money = player.money.add(Decimal.pow(1.2, player.marketing).mul(plantSell/2));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
}
function sell10Honey() {
	if (player.honey.lt(1000)) return;
	player.honey = player.honey.sub(1000);
	player.money = player.money.add(Decimal.pow(1.2, player.marketing).mul(plantSell*5));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
}