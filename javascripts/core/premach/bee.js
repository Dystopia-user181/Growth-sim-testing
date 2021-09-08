function sellHoney(amt=200) {
	amt = new Decimal(amt);
	if (player.honey.lt(amt)) return;
	player.honey = player.honey.sub(amt);
	player.money = player.money.add(amt.mul(0.1));
	if (player.money.gte(40)) player.tutorial.unlockedPot = true;
	if (player.money.gte(500)) player.tutorial.unlockedMarketing = true;
	if (player.money.gte(1e14) && !player.tutorial.unlockedMachine) {
		player.navigation.tab = "Machine";
	}
	if (player.money.gte(1e14)) player.tutorial.unlockedMachine = true;
}
function queenReset() {
	if (player.bees.lt(Decimal.pow(vm.qus[2].bought?500:1e3, player.queens.amt).mul(1e5))) return;
	if (!player.tutorial.madeQueen) { if (!confirm("Doing a queen reset will reset your bees and honey and make bee production worse for 50 seconds. Do you want to do a queen reset?")) return;}
	player.queens.amt = player.queens.amt.add(1);
	player.tutorial.madeQueen = true;
	if (!vm.qus[4].bought) {
		player.bees = new Decimal(0);
		player.honey = new Decimal(0);
		player.queens.beeproduction = 0;
	}
}
function giveHoney() {
	player.queens.honey = player.queens.honey.add(player.honey.div(2));
	player.honey = player.honey.div(2);
}
function buyQueenUpgrade(obj) {
	if (!obj.bought && player.queens.amt.gte(obj.cost)) {
		player.queens.upgrades += Math.pow(2, obj.id);
		player.queens.amt = player.queens.amt.sub(obj.cost);
	}
}
function qus() {
	return [
		{
			desc: "Square base cultivator and hive production.",
			cost: new Decimal(2),
			id: 0,
			bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-1] == "1"
		},
		{
			desc: "Queen honey effect cap is ^1.5.",
			cost: new Decimal(3),
			id: 1,
			bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-2] == "1"
		},
		{
			desc: "Queen scaling is reduced by 50%.",
			cost: new Decimal(4),
			id: 2,
			bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-3] == "1"
		},
		{
			desc: "Cultivator production is boosted by Queens and Queen honey.",
			cost: new Decimal(5),
			id: 3,
			bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-4] == "1"
		},
		{
			desc: "Queens no longer reset anything.",
			cost: new Decimal(40),
			id: 4,
			bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-5] == "1"
		},
		{
			desc: "Unlock honeycomb structures.",
			cost: new Decimal(45),
			id: 5,
			bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-6] == "1"
		},
		{
			desc: "Queens directly boost bee production.",
			cost: new Decimal(70),
			id: 6,
			bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-7] == "1"
		},
		{
			desc: "BEGIN THE PLAN.",
			cost: new Decimal(100),
			id: 7,
			bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-8] == "1"
		},
	]
}
function buyHC(obj) {
	if (player.honeycombs.gte(obj.cost) && player.combstructures.reduce((a, i) => a = a.add(i)).lte(vm.space)) {
		player.honeycombs = player.honeycombs.sub(obj.cost);
		Vue.set(player.combstructures, obj.id, player.combstructures[obj.id].add(1));
	}
}
function hcs() {
	return [
		{
			amt: player.combstructures[0],
			cost: Decimal.pow(400, player.combstructures[0].pow(1.2)).mul(1e5),
			id: 0,
			desc: "Boost all plant production by x2.5.",
			boost: Decimal.pow(2.5, player.combstructures[0].add(player.combstructures[3])),
			effect() {
				return `x${toNot(this.boost, 2)}`
			}
		},
		{
			amt: player.combstructures[1],
			cost: Decimal.pow(600, player.combstructures[1].pow(1.3)).mul(1e20),
			id: 1,
			desc: "Boost honeycomb production by x10.",
			boost: Decimal.pow(10, player.combstructures[1].add(player.combstructures[3])),
			effect() {
				return `x${toNot(this.boost, 2)}`
			}
		},
		{
			amt: player.combstructures[2],
			cost: Decimal.pow(1e4, player.combstructures[2].pow(1.5)).mul(1e70),
			id: 2,
			desc: "Produce more plant power.",
			boost: Decimal.pow(2, player.combstructures[2].add(player.combstructures[3]).pow(0.75)),
			effect() {
				return `x${toNot(this.boost, 2)}`
			}
		},
		{
			amt: player.combstructures[3],
			cost: Decimal.pow(1e5, player.combstructures[3].pow(1.7)).mul(1e140),
			id: 3,
			desc: "Adds free levels to all previous buildings.",
			boost: player.combstructures[3],
			effect() {
				return `+${toNot(this.boost, 2)}`
			}
		},
	]
}