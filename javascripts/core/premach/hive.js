function comb() {
	player.honeycomb = player.honeycomb.add(player.hive.pow(2));
}
var recomb = setInterval(comb, 1000);
function buyHive() {
	if (player.hive.lte(200)) {
		if (player.money.lt(player.hive.mul(5).add(20))) return;
		player.money = player.money.sub(player.hive.mul(5).add(20));
		player.hive = player.hive.add(1);
	} else {
		if (player.money.lt(Decimal.pow(1.01, player.hive.sub(200)).mul(1000))) return;
		player.money = player.money.sub(Decimal.pow(1.01, player.hive.sub(200)).mul(1000));
		player.hive = player.hive.add(1);
	}
}
function buyMaxHive(money) {
	if (money.lt(Decimal.pow(1.01, player.hive.sub(200)).mul(1000))) return;
	var hiveamt = new Decimal(money.add(Decimal.pow(1.01, player.hive.sub(200)).mul(101000)).div(101000).log(1.01)).sub(player.hive.sub(200)).floor().max(0);
	player.money = player.money.sub(Decimal.pow(1.01, player.hive.add(hiveamt).sub(200)).mul(101000).sub(Decimal.pow(1.01, player.hive.sub(200)).mul(101000))).max(0);
	player.hive = player.hive.add(hiveamt);
}