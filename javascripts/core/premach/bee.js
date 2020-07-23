function addHoneyBee() {
	if (player.tutorial.unlockedHoneybee) {
		player.bee = player.bee.add(player.plantUnpicked.pow(0.55).mul(player.honeycomb.pow(0.3).add(1))).min(player.plantUnpicked.div(50).mul(player.honeycomb.pow(Decimal.div(1, player.honeycomb.add(100).log(100))).add(1)));
	}
}
setInterval(addHoneyBee, 2000);
function sellHoney(amt=100) {
	amt = new Decimal(amt);
	if (player.honey.lt(amt)) return;
	player.honey = player.honey.sub(amt);
	player.money = player.money.add(Decimal.pow(1.5, player.marketing).mul(0.05).mul(amt));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
}