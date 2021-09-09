function getCvtScal (obj) {
	return obj.bought.lt(4000) ? obj.bought.lte(200) ? 
		obj.bought.mul(5).add(20) : 
		Decimal.pow(1.01, obj.bought.sub(200)).mul(1000) : Decimal.pow(vm.cus[1].bought?Math.sqrt(1.1):1.1, obj.bought.sub(4000)).mul(2.7e19);
}
function getCvtUpScal (obj) {
	return vm.getNScal(2e3, obj.level.add(obj.level.sub(50).max(0).pow(2)), 2e3);
}
function upCvt(type) {
	if (player.money.lt(getCvtUpScal(player[type]))) return;
	player.money = player.money.sub(getCvtUpScal(player[type]));
	player[type].level = player[type].level.add(1);
}
function buyCvt(type) {
	if (player.money.lt(getCvtScal(player[type]))) return;
	player.money = player.money.sub(getCvtScal(player[type]));
	player[type].total = player[type].total.add(1);
	player[type].bought = player[type].bought.add(1);
}
function buyMaxCvt(money, type) {
	var iterations = 0;
	while (money.gte(getCvtScal(player[type]).mul(1e6)) && iterations < 40000) {
		player[type].total = player[type].total.add(5);
		player[type].bought = player[type].bought.add(5);
		iterations++;
	}
	while (money.gte(getCvtScal(player[type])) && iterations < 40000) {
		player.money = player.money.sub(getCvtScal(player[type]));
		player[type].total = player[type].total.add(1);
		player[type].bought = player[type].bought.add(1);
		money = money.sub(getCvtScal(player[type]));
		iterations++;
	}
}
function buyMaxCvtUp(money, type) {
	var iterations = 0;
	while (money.gte(getCvtUpScal(player[type])) && iterations < 40000) {
		player.money = player.money.sub(getCvtUpScal(player[type]));
		player[type].level = player[type].level.add(1);
		iterations++;
	}
}
function buyCvtUpgrade(obj) {
	if (!obj.bought && player.cvt.bought.gte(obj.cost)&&player.hives.bought.gte(obj.cost)) {
		player.cvtupgrades += Math.pow(2, obj.id);
		player.cvt.bought = player.cvt.bought.sub(obj.cost);
		player.cvt.total = player.cvt.total.sub(obj.cost);
		player.hives.bought = player.hives.bought.sub(obj.cost);
		player.hives.total = player.hives.total.sub(obj.cost);
	}
}
function cus() {
	return [
		{
			desc: "Square base cultivator production again.",
			cost: new Decimal(5555),
			id: 0,
			bought: player.cvtupgrades.toString(2)[player.cvtupgrades.toString(2).length-1] == "1"
		},
		{
			desc: "Post-4000 cultivator and hive scaling is square rooted.",
			cost: new Decimal(6000),
			id: 1,
			bought: player.cvtupgrades.toString(2)[player.cvtupgrades.toString(2).length-2] == "1"
		},
		{
			desc: "For every 400 bought cultivators/hives double their respective production.",
			cost: new Decimal(81e2),
			id: 2,
			bought: player.cvtupgrades.toString(2)[player.cvtupgrades.toString(2).length-3] == "1"
		},
		{
			desc: "Boost plant and honeycomb production by bees^0.05.",
			cost: new Decimal(1e4),
			id: 3,
			bought: player.cvtupgrades.toString(2)[player.cvtupgrades.toString(2).length-4] == "1"
		},
	]
}