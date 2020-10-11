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
	} else if (player.hives.bought.lte(4000)) {
		if (player.money.lt(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(1000))) return;
		player.money = player.money.sub(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(1000));
		player.hives.total = player.hives.total.add(1);
		player.hives.bought = player.hives.bought.add(1);
	} else {
		if (player.money.lt(Decimal.pow(1.1, player.hives.bought.sub(4000)).mul(2.7e19))) return;
		player.money = player.money.sub(Decimal.pow(1.1, player.hives.bought.sub(4000)).mul(2.7e19));
		player.hives.total = player.hives.total.add(1);
		player.hives.bought = player.hives.bought.add(1);
	}
}
function buyMaxHive(money) {
	if (player.hives.bought.lt(4000)) {
		if (player.money.lt(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(1000))) return;
		var hivesamt = new Decimal(money.add(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(101000)).div(101000).log(1.01)).sub(player.hives.bought.sub(200)).floor().max(0).min(Decimal.sub(4000, player.hives.bought));
		player.money = player.money.sub(Decimal.pow(1.01, player.hives.bought.add(hivesamt).sub(200)).mul(101000).sub(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(101000))).max(0);
		player.automoney = player.automoney.sub(Decimal.pow(1.01, player.hives.bought.add(hivesamt).sub(200)).mul(101000).sub(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(101000)));
		player.hives.total = player.hives.total.add(hivesamt);
		player.hives.bought = player.hives.bought.add(hivesamt);
	} else {
		if (player.money.lt(Decimal.pow(1.1, player.hives.bought.sub(4000)).mul(2.7e19))) return;
		var hivesamt = new Decimal(money.add(Decimal.pow(1.1, player.hives.bought.sub(4000)).mul(2.97e20)).div(2.97e20).log(1.1)).sub(player.hives.bought.sub(4000)).floor().max(0);
		player.money = player.money.sub(Decimal.pow(1.1, player.hives.bought.add(hivesamt).sub(4000)).mul(2.97e20).sub(Decimal.pow(1.1, player.hives.bought.sub(4000)).mul(2.97e20))).max(0);
		player.automoney = player.automoney.sub(Decimal.pow(1.1, player.hives.bought.add(hivesamt).sub(4000)).mul(2.97e20).sub(Decimal.pow(1.1, player.hives.bought.sub(4000)).mul(2.97e20)));
		player.hives.total = player.hives.total.add(hivesamt);
		player.hives.bought = player.hives.bought.add(hivesamt);
	}
}