function assign() {
	if (player.plantium.lt(Decimal.pow(2, player.generators))) return;
	player.plantium = player.plantium.sub(Decimal.pow(2, player.generators));
	player.generators = player.generators.add(1);
}
function assignMax(money) {
	if (money.lt(Decimal.pow(2, player.generators))) return;
	var genamt = new Decimal(money.add(Decimal.pow(2, player.generators).mul(2)).div(2).log(2)).sub(player.generators).floor().max(0);
	player.plantium = player.plantium.sub(Decimal.pow(2, player.generators.add(genamt)).mul(2).sub(Decimal.pow(2, player.generators).mul(2))).max(0);
	player.generators = player.generators.add(genamt);
}