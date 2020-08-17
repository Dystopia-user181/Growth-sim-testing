function addHoneyBee() {
	if (player.tutorial.unlockedHoneybee) {
		player.bees = player.bees.add(player.plants.field.pow(0.55).mul(player.honeycombs.pow(0.3).add(1)).mul(player.plantpow.add(1).pow(1.1))).min(player.plants.field.div(50).mul(player.honeycombs.pow(Decimal.div(1, player.honeycombs.add(100).log(100))).add(1)));
	}
}
function sellHoney(amt=200) {
	amt = new Decimal(amt);
	if (player.honey.lt(amt)) return;
	player.honey = player.honey.sub(amt);
	player.money = player.money.add(Decimal.pow(1.5, player.marketing).mul(0.1).mul(amt));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e14) && !player.tutorial.unlockedMachine) player.navigation.tab = "Machine";
	if (player.money.gte(1e14)) player.tutorial.unlockedMachine = true;
}