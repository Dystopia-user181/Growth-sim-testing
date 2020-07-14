function upmarketing() {
	if (player.money.lt(Decimal.pow(1e5, player.marketing).mul(1e3))) return;
	player.marketing = player.marketing.add(1);
	player.money = player.money.sub(Decimal.pow(1e5, player.marketing.sub(1)).mul(1e3));
}
function buyMaxMark(money) {
	if (player.money.lt(Decimal.pow(1e5, player.marketing).mul(1e3))) return;
	var markamt = new Decimal(money.div(1e3).log(1e5)).floor().sub(player.marketing).add(1).max(0);
	player.money = player.money.sub(Decimal.pow(1e5, player.marketing.add(markamt).sub(1)).mul(1e3));
	player.marketing = player.marketing.add(markamt);
}