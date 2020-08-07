function grow() {
	var prevPlants = player.plantPicked;
	player.plantPicked = player.plantPicked.add(player.plantPicked.max(1).min(player.container.total).pow(player.containerLevel.div(2).add(1)).mul(player.honey.add(1).pow(0.2)).mul(player.plantpow.add(1).pow(1.1)));
	prevPlants = player.plantPicked.sub(prevPlants);
	sell(prevPlants.mul(player.automator.sellPlant));
	if (player.plantPicked.gt(300)) player.tutorial.unlockedHoneybee = true;
	if (player.automator.buycontainerup) buyMaxCvtUp(player.money);
	if (player.automator.buymarketing) buyMaxMark(player.money);
	if (player.automator.buycontainer) buyMaxCvt(player.money);
	if (player.automator.buycontainer) buyMaxHive(player.money);
}
function upCvt() {
	if (player.money.lt(Decimal.pow(2e3, player.containerLevel.add(1)))) return;
	player.containerLevel = player.containerLevel.add(1);
	player.money = player.money.sub(Decimal.pow(2e3, player.containerLevel));
}
function buyCvt() {
	if (player.container.bought.lte(200)) {
		if (player.money.lt(player.container.bought.mul(5).add(20))) return;
		player.money = player.money.sub(player.container.bought.mul(5).add(20));
		player.container.total = player.container.total.add(1);
		player.container.bought = player.container.bought.add(1);
	} else {
		if (player.money.lt(Decimal.pow(1.01, player.container.bought.sub(200)).mul(1000))) return;
		player.money = player.money.sub(Decimal.pow(1.01, player.container.bought.sub(200)).mul(1000));
		player.container.total = player.container.total.add(1);
		player.container.bought = player.container.bought.add(1);
	}
}
function buyMaxCvt(money) {
	if (player.money.lt(Decimal.pow(1.01, player.container.bought.sub(200)).mul(1000))) return;
	var cvtamt = new Decimal(money.add(Decimal.pow(1.01, player.container.bought.sub(200)).mul(101000)).div(101000).log(1.01)).sub(player.container.bought.sub(200)).floor().max(0);
	player.money = player.money.sub(Decimal.pow(1.01, player.container.bought.add(cvtamt).sub(200)).mul(101000).sub(Decimal.pow(1.01, player.container.bought.sub(200)).mul(101000))).max(0);
	player.container.total = player.container.total.add(cvtamt);
	player.container.bought = player.container.bought.add(cvtamt);
}
function buyMaxCvtUp(money) {
	if (player.money.lt(Decimal.pow(2e3, player.containerLevel).mul(2e3))) return;
	var cvtupamt = new Decimal(money.log(2e3)).floor().sub(player.containerLevel).max(0);
	player.money = player.money.sub(Decimal.pow(2e3, player.containerLevel.add(cvtupamt)));
	player.containerLevel = player.containerLevel.add(cvtupamt);
}