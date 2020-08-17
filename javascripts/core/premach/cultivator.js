function grow() {
	var prevPlants = player.plants.picked;
	player.plants.picked = player.plants.picked.add(player.plants.picked.max(1).min(player.cvt.total.floor()).pow(player.cvt.level.div(2).add(1)).mul(player.honey.add(1).pow(0.2)).mul(player.plantpow.add(1).pow(1.1)));
	prevPlants = player.plants.picked.sub(prevPlants);
	sell(prevPlants.mul(player.automator.sellPlant));
	if (player.plants.picked.gt(300)) player.tutorial.unlockedHoneybee = true;
	if (player.automator.buycontainerup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycontainer) buyMaxCvt(player.money);
	if (player.automator.buycontainer) buyMaxHive(player.money);
}
function upCvt() {
	if (player.money.lt(Decimal.pow(2e3, player.cvt.level.add(1)))) return;
	player.cvt.level = player.cvt.level.add(1);
	player.money = player.money.sub(Decimal.pow(2e3, player.cvt.level));
}
function buyCvt() {
	if (player.cvt.bought.lte(200)) {
		if (player.money.lt(player.cvt.bought.mul(5).add(20))) return;
		player.money = player.money.sub(player.cvt.bought.mul(5).add(20));
		player.cvt.total = player.cvt.total.add(1);
		player.cvt.bought = player.cvt.bought.add(1);
	} else {
		if (player.money.lt(Decimal.pow(1.01, player.cvt.bought.sub(200)).mul(1000))) return;
		player.money = player.money.sub(Decimal.pow(1.01, player.cvt.bought.sub(200)).mul(1000));
		player.cvt.total = player.cvt.total.add(1);
		player.cvt.bought = player.cvt.bought.add(1);
	}
}
function buyMaxCvt(money) {
	if (player.money.lt(Decimal.pow(1.01, player.cvt.bought.sub(200)).mul(1000))) return;
	var cvtamt = new Decimal(money.add(Decimal.pow(1.01, player.cvt.bought.sub(200)).mul(101000)).div(101000).log(1.01)).sub(player.cvt.bought.sub(200)).floor().max(0);
	player.money = player.money.sub(Decimal.pow(1.01, player.cvt.bought.add(cvtamt).sub(200)).mul(101000).sub(Decimal.pow(1.01, player.cvt.bought.sub(200)).mul(101000))).max(0);
	player.cvt.total = player.cvt.total.add(cvtamt);
	player.cvt.bought = player.cvt.bought.add(cvtamt);
}
function buyMaxCvtUp(money) {
	if (player.money.lt(Decimal.pow(2e3, player.cvt.level).mul(2e3))) return;
	var cvtupamt = new Decimal(money.log(2e3)).floor().sub(player.cvt.level).max(0);
	player.money = player.money.sub(Decimal.pow(2e3, player.cvt.level.add(cvtupamt)));
	player.cvt.level = player.cvt.level.add(cvtupamt);
}