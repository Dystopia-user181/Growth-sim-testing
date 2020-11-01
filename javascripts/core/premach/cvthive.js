function upCvt(type) {
	if (player.money.lt(vm.getCvtUpScal(player[type]))) return;
	player.money = player.money.sub(vm.getCvtUpScal(player[type]));
	player[type].level = player[type].level.add(1);
}
function buyCvt(type) {
	if (player.money.lt(vm.getCvtScal(player[type]))) return;
	player.money = player.money.sub(vm.getCvtScal(player[type]));
	player.automoney = player.automoney.sub(vm.getCvtScal(player[type]));
	player[type].total = player[type].total.add(1);
	player[type].bought = player[type].bought.add(1);
}
function buyMaxCvt(money, type) {
	var iterations = 0;
	while (money.gte(vm.getCvtScal(player[type])) && iterations < 4000) {
		money = money.sub(vm.getCvtUpScal(player[type]));
		buyCvt(type);
		iterations++;
	}
}
function buyMaxCvtUp(money, type) {
	var iterations = 0;
	while (money.gte(vm.getCvtUpScal(player[type])) && iterations < 4000) {
		upCvt(type);
		iterations++;
	}
}