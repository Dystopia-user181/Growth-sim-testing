function upmarketing() {
	if (player.money.lt(Decimal.pow(1e5, player.marketing).mul(1e3))) return;
	player.marketing = player.marketing.add(1);
	player.money = player.money.sub(Decimal.pow(1e5, player.marketing.sub(1)).mul(1e3));
}