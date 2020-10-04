function sellHoney(amt=200) {
	amt = new Decimal(amt);
	if (player.honey.lt(amt)) return;
	player.honey = player.honey.sub(amt);
	player.money = player.money.add(Decimal.pow(1.6, player.marketing).mul(0.1).mul(amt));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e14) && !player.tutorial.unlockedMachine) player.navigation.tab = "Machine";
	if (player.money.gte(1e14)) player.tutorial.unlockedMachine = true;
}
