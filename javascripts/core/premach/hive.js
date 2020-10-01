function upHive() {
	if (player.money.lt(Decimal.pow(2e3, player.hives.level.add(1)))) return;
	player.hives.level = player.hives.level.add(1);
	player.money = player.money.sub(Decimal.pow(2e3, player.hives.level));
}
function buyHive() {
	if (player.hives.bought.lte(200)) {
		if (player.money.lt(player.hives.bought.mul(5).add(20))) return;
		player.money = player.money.sub(player.hives.bought.mul(5).add(20));
		player.hives.total = player.hives.total.add(1);
		player.hives.bought = player.hives.bought.add(1);
	} else {
		if (player.money.lt(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(1000))) return;
		player.money = player.money.sub(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(1000));
		player.hives.total = player.hives.total.add(1);
		player.hives.bought = player.hives.bought.add(1);
	}
}
function buyMaxHive(money) {
	if (money.lt(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(1000))) return;
	var hiveamt = new Decimal(money.add(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(101000)).div(101000).log(1.01)).sub(player.hives.bought.sub(200)).floor().max(0);
	player.money = player.money.sub(Decimal.pow(1.01, player.hives.bought.add(hiveamt).sub(200)).mul(101000).sub(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(101000))).max(0);
	player.hives.total = player.hives.total.add(hiveamt);
	player.hives.bought = player.hives.bought.add(hiveamt);
}