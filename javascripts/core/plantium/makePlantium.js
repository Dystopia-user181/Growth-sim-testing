function buyMach() {
	if (player.machines.gte(1)) {
		if (player.plantium.lt(Decimal.pow(3, player.machines).mul(1e2))) return;
		player.plantium = player.plantium.sub(Decimal.pow(3, player.machines.add(player.machines.sub(30).max(0).pow(2))).mul(1e2));
		player.machines = player.machines.add(1);
		return;
	}
	if (player.money.lt(1e14)) return;
	player.money = player.money.sub(1e14);
	player.machines = player.machines.add(1);
}
function makePlantium() {
	if (player.plants.picked.lt(player.plantiumplantamt) || player.honey.lt(player.plantiumplantamt.div(10)) || player.plantiumprocess > 2) return;
	player.plantiumprocess = 2.1;
	player.onplantiumgain = player.plants.picked.div(player.plantiumplantamt).min(player.honey.div(player.plantiumplantamt.div(10)).min(player.machines.mul(vm.pus[5].bought?5:1)));
}

function buyPlantiumUpgrade(obj) {
	if (!obj.bought && player.plantium.gte(obj.cost)) {
		player.plantiumupgrades += Math.pow(2, obj.id);
		player.plantium = player.plantium.sub(obj.cost);
	}
}
function pus() {
	return [
		{
			title: "Effective Power",
			desc: "Double the plant power effect exponent (1.1 -> 2.2).",
			cost: new Decimal(3),
			id: 0,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-1] == "1"
		},
		{
			title: "Volatility",
			desc: "Plantium no longer resets anything, only subtracts from plant and honey amount.",
			cost: new Decimal(5),
			id: 1,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-2] == "1"
		},
		{
			title: "Quick Unload",
			desc: "Machine speed is 0.1 seconds.",
			cost: new Decimal(6),
			id: 2,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-3] == "1"
		},
		{
			title: "Solar factories",
			desc: "Factories do not consume plant power.",
			cost: new Decimal(100),
			id: 3,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-4] == "1"
		},
		{
			title: "Automate it 420",
			desc: "Unlock better automation.",
			cost: new Decimal(420),
			id: 4,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-5] == "1"
		},
		{
			title: "The Machine Room",
			desc: "You can buy more machines in the machines tab. This results in more plantium per tick. Also adds 4 more slots to a machine.",
			cost: new Decimal(2e3),
			id: 5,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-6] == "1"
		},
		{
			title: "The Machine Room II",
			desc: "You can input more plants into the machine, which returns more plantium. This value is adjustable in the machines tab.",
			cost: new Decimal(5e4),
			id: 6,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-7] == "1"
		},
		{
			title: "Direct conversion",
			desc: "Boost plant and honeycomb production based on plantium.",
			cost: new Decimal(1e6),
			id: 7,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-8] == "1",
			effect: `x${toNot(player.plantium.add(1).pow(0.4), 2)}`
		},
		{
			title: "Super Generators",
			desc: "Unlock batteries.",
			cost: new Decimal(3e9),
			id: 8,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-9] == "1"
		},
		{
			title: "More Upgrades",
			desc: "Unlock cultivator upgrades and a second row of queen upgrades.",
			cost: new Decimal(1e15),
			id: 9,
			bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-10] == "1"
		},
	]
}