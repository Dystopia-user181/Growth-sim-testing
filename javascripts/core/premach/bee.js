function sellHoney(amt=200) {
	amt = new Decimal(amt);
	if (player.honey.lt(amt)) return;
	player.honey = player.honey.sub(amt);
	player.money = player.money.add(Decimal.pow(1.6, player.marketing).mul(0.1).mul(amt));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e14) && !player.tutorial.unlockedMachine) {
		player.navigation.tab = "Machine";
		let tmp = player.option.theme;
		player.option.theme = "a";
		setTimeout(()=>player.option.theme = temp, 30);
	}
	if (player.money.gte(1e14)) player.tutorial.unlockedMachine = true;
	if (player.automator.buycvtratio) {
		player.automoney = player.automoney.add(amt.mul(player.automator.buycvtr));
	}
	if (player.automator.buycvt) {
		buyMaxCvt(player.automator.buycvtratio?player.automoney:player.money);
		buyMaxHive(player.automator.buycvtratio?player.automoney:player.money);
	}
}