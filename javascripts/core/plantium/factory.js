function buyFactory() {
	if (player.money.lt(Decimal.pow(2, player.factories).mul(1e4))) return;
	player.money = player.money.sub(Decimal.pow(2, player.factories).mul(1e4));
	player.factories = player.factories.add(1);
}
function buyMaxFactory(money) {
	if (money.lt(Decimal.pow(2, player.factories).mul(1e4))) return;
	var facamt = new Decimal(money.div(1e4).add(Decimal.pow(2, player.factories)).log(2)).sub(player.factories).floor().max(0);
	player.money = player.money.sub(Decimal.pow(2, player.factories).sub(Decimal.pow(2, player.factories)).mul(1e4)).max(0);
	player.factories = player.factories.add(facamt);
}