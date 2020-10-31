function unplant(amt=1) {
	amt = new Decimal(amt);
	if (player.plants.field.lt(amt)) return;
	player.plants.field = player.plants.field.sub(amt);
	player.plants.picked = player.plants.picked.add(amt);
	sell(amt.mul(player.automator.sellPlant));
	if (player.plants.picked.gt(30)) player.tutorial.unlockedSell = true;
	if (player.plants.picked.gt(300) && player.tutorial.unlockedSell) player.tutorial.unlockedHoneybee = true;
}
function sell(amt = 1) {
	amt = new Decimal(amt);
	if (player.plants.picked.lt(amt)) return;
	player.plants.picked = player.plants.picked.sub(amt);
	player.money = player.money.add(amt);
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e14) && !player.tutorial.unlockedMachine) {
		player.navigation.tab = "Machine";
		let tmp = player.option.theme;
		player.option.theme = "a";
		setTimeout(()=>player.option.theme = tmp, 30);
	}
	if (player.money.gte(1e14)) player.tutorial.unlockedMachine = true;
	if (player.automator.buycvt) {
		buyMaxCvt(player.automator.buycvtratio?player.automoney.div(1.9):player.money.div(1.9), "cvt");
		buyMaxCvt(player.automator.buycvtratio?player.automoney:player.money, "hives");
		buyMaxCvt(player.automator.buycvtratio?player.automoney:player.money, "cvt");
	}
	if (player.automator.buycvtratio) {
		player.automoney = player.automoney.add(amt.mul(player.automator.buycvtr));
	}
}