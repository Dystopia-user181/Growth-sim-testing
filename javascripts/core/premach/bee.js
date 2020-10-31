function sellHoney(amt=200) {
	amt = new Decimal(amt);
	if (player.honey.lt(amt)) return;
	player.honey = player.honey.sub(amt);
	player.money = player.money.add(amt.mul(0.1));
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
		buyMaxCvt(player.automator.buycvtratio?player.automoney.div(1.9):player.money.div(1.9), "cvt");
		buyMaxCvt(player.automator.buycvtratio?player.automoney:player.money, "hives");
		buyMaxCvt(player.automator.buycvtratio?player.automoney:player.money, "cvt");
	}
}
function queenReset() {
	if (player.bees.lt(Decimal.pow(vm.qus[2].bought?500:1e3, player.queens.amt).mul(1e5))) return;
	player.queens.amt = player.queens.amt.add(1);
	if (!vm.qus[4].bought) {
		player.bees = new Decimal(0);
		player.honey = new Decimal(0);
		player.queens.beeproduction = 0;
	}
}
function giveHoney() {
	player.queens.honey = player.queens.honey.add(player.honey.div(2));
	player.honey = player.honey.div(2);
}