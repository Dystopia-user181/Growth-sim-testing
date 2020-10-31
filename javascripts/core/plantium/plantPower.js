function assign() {
	if (player.plantium.lt(vm.getGenScal())) return;
	player.plantium = player.plantium.sub(vm.getGenScal());
	player.generators = player.generators.add(1);
}
function assignMax(money) {
	if (money.lt(vm.getGenScal())) return;
	while (money.gte(vm.getGenScal())) {
		assign();
	}
}
function buybattery() {
	if (player.generators.lt(Decimal.pow(2, player.batteries))) return;
	player.generators = player.generators.sub(Decimal.pow(2, player.batteries));
	player.batteries = player.batteries.add(1);
}