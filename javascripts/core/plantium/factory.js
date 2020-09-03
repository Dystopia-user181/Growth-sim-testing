function buyFactory() {
	if (player.money.lt(Decimal.pow(10, player.factories).mul(1e4))) return;
	player.money = player.money.sub(Decimal.pow(10, player.factories).mul(1e4));
	player.factories = player.factories.add(1);
}