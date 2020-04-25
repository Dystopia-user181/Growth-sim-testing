function buy (stuff) {
	switch (stuff) {
		case "1":
		//Hack
		if (player.money.gte(costs.hacks) && player.hacks[1].add(1).lt(maxHacks)) {
			player.hacks = [player.hacks[0].add(1), player.hacks[1].add(1)];
			player.money = player.money.minus(costs.hacks);
			costs.hacks = Decimal.pow(2, player.hacks[1]);
		}
		break;
		case "2":
		//Hacker
		if (player.money.gte(costs.hackers)) {
			player.hackers = [player.hackers[0].add(1), player.hackers[1].add(1)];
			player.money = player.money.minus(costs.hackers);
			costs.hackers = Decimal.mul(100, Decimal.pow(3, player.hackers[1]));
		}
		break;
		case "3":
		//Trainer
		if (player.money.gte(costs.trainers)) {
			player.trainers = [player.trainers[0].add(1), player.trainers[1].add(1)];
			player.money = player.money.minus(costs.trainers);
			costs.trainers = Decimal.mul(10000, Decimal.pow(4, player.trainers[1]));
		}
		break;
		case "4":
		//Master
		if (player.money.gte(costs.masters)) {
			player.masters = [player.masters[0].add(1), player.masters[1].add(1)];
			player.money = player.money.minus(costs.masters);
			costs.masters = Decimal.mul(1000000, Decimal.pow(5, player.masters[1]));
		}
		break;
		case "ef":
		//Efficiency
		if (player.money.gte(costs.efficiency)) {
			player.efficiencies = player.efficiencies.add(1);
			player.money = player.money.minus(costs.efficiency);
			costs.efficiency = Decimal.mul(1000, Decimal.pow(10, player.efficiencies));
		}
	}
}
function buyCompt (stuff) {
	switch (stuff) {
		case "computer": 
		if (player.money.gte(costs.computer[0])){
			player.money = player.money.minus(costs.computer[0]);
			costs.computer[0] = costs.computer[0].mul(5);
			player.computer[0] = player.computer[0].add(1);
		}
		break;
		case "server": 
		if (player.money.gte(costs.computer[1])){
			player.money = player.money.minus(costs.computer[1]);
			costs.computer[1] = costs.computer[1].mul(7.5);
			player.computer[1] = player.computer[1].add(1);
		}
		break;
		case "memory": 
		if (player.money.gte(costs.computer[2])){
			player.money = player.money.minus(costs.computer[2]);
			costs.computer[2] = costs.computer[2].mul(8);
			player.computer[2] = player.computer[2].add(1);
		}
		break;
		case "power": 
		if (player.money.gte(costs.computer[3])){
			player.money = player.money.minus(costs.computer[3]);
			costs.computer[3] = costs.computer[3].mul(100);
			player.computer[3] = player.computer[3].add(1);
		}
		break;
		default: break;
	}
}
function buyMax (stuff) {
	//Hack
	switch (stuff) {
		case "1":
		while (player.money.gte(costs.hacks)) {
			buy('1');
		}
		break;
		//Hacker
		case "2":
		while (player.money.gte(costs.hackers)) {
			buy('2');
		}
		break;
		//Trainer
		case "3":
		while (player.money.gte(costs.trainers)) {
			buy('3');
		}
		break;
		//Master
		case "4":
		while (player.money.gte(costs.masters)) {
			buy('4');
		}
		break;
		case "ef":
		//Efficiency
		while (player.money.gte(costs.efficiency)) {
			buy('ef');
		}
		break;
		default: break;
	}
}
function unlock () {
	//Unlock Hacker
	if (player.resets.equals(new Decimal(0))) {
		if (player.hacks[0].gte(new Decimal(15))) {
			player.resets = new Decimal(1);
			player.hacks = [player.hacks[0].minus(15), player.hacks[1].minus(15)];
		}
	} 
	//Unlock Trainer
	if (player.resets.equals(new Decimal(1))) {
		if (player.hackers[0].gte(new Decimal(15))) {
			player.resets = new Decimal(2);
			player.hacks = [new Decimal(0), new Decimal(0)]
			player.hackers = [player.hackers[0].minus(15), player.hackers[1].minus(15)];
		}
	}
	//Unlock Master
	if (player.resets.equals(new Decimal(2))) {
		if (player.trainers[0].gte(new Decimal(15))) {
			player.resets = new Decimal(3);
			player.hacks = [new Decimal(0), new Decimal(0)];
			player.hackers = [new Decimal(0), new Decimal(0)];
			player.trainers = [player.trainers[0].minus(15), player.trainers[1].minus(15)];
		}
	}
}
function reset (stuff) {
	if (player.masters[1].gte(costs.unlock)) {
		player = {
			money: new Decimal(1),
			hacks: [new Decimal(0), new Decimal(0)],
			hackers: [new Decimal(0), new Decimal(0)],
			trainers: [new Decimal(0), new Decimal(0)],
			masters: [new Decimal(0), new Decimal(0)],
			computer: player.computer,
			efficiencies: new Decimal(0),
			efficiency: new Decimal(1),
			resets: player.resets.add(1),
			matrixPoints: player.matrixPoints,
			matrixStat: player.matrixStat,
			timePlayed: player.timePlayed,
			notation: player.notation,
			theme: player.theme,
			neon: player.neon
		}
	}
}
function corrupt () {
	player = {
		money: new Decimal(1),
		hacks: [new Decimal(0), new Decimal(0)],
		hackers: [new Decimal(0), new Decimal(0)],
		trainers: [new Decimal(0), new Decimal(0)],
		masters: [new Decimal(0), new Decimal(0)],
		computer: [new Decimal(1), new Decimal(0), new Decimal(0), new Decimal(0)],
		efficiencies: new Decimal(0),
		efficiency: new Decimal(1),
		resets: new Decimal(0),
		matrixPoints: player.matrixPoints.add(1),
		matrixStat: player.matrixStat.add(1),
		timePlayed: player.timePlayed,
		notation: player.notation,
		theme: player.theme,
		neon: player.neon
	}
}