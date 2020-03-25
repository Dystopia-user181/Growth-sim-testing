function buy (stuff) {
	//Hack
	if (stuff == "1") {
		if (player.money.minus(costs.hacks).m >= 0 ) {
			player.hacks = [player.hacks[0].add(1), player.hacks[1].add(1)];
			player.money = player.money.minus(costs.hacks);
			costs.hacks = Decimal.pow(2, player.hacks[1]);
		}
	//Hacker
	} else if (stuff == "2") {
		if (player.money.minus(costs.hackers).m >= 0 ) {
			player.hackers = [player.hackers[0].add(1), player.hackers[1].add(1)];
			player.money = player.money.minus(costs.hackers);
			costs.hackers = Decimal.mul(100, Decimal.pow(3, player.hackers[1]));
		}
	} else if (stuff == "3") {
		if (player.money.minus(costs.trainers).m >= 0 ) {
			player.trainers = [player.trainers[0].add(1), player.trainers[1].add(1)];
			player.money = player.money.minus(costs.trainers);
			costs.trainers = Decimal.mul(10000, Decimal.pow(4, player.trainers[1]));
		}
	//Master
	} else if (stuff == "4") {
		if (player.money.minus(costs.masters).m >= 0 ) {
			player.masters = [player.masters[0].add(1), player.masters[1].add(1)];
			player.money = player.money.minus(costs.masters);
			costs.masters = Decimal.mul(1000000, Decimal.pow(5, player.masters[1]));
		}
	//Efficiency
	} else if (stuff == "ef") {
		if (player.money.gte(costs.efficiency)) {
			player.efficiencies = player.efficiencies.add(1);
			player.money = player.money.minus(costs.efficiency);
			costs.efficiency = Decimal.mul(1000, Decimal.pow(10, player.efficiencies));
		}
	}
}
function buyMax (stuff) {
	//Hack
	if (stuff == "1") {
		if (parseInt(player.hacks[1].m*Math.pow(10, player.hacks[1].e))%5 == 0) {
			buy('1');
			buy('1');
			buy('1');
			buy('1');
			buy('1');
		} else if (parseInt(player.hacks[1].m*Math.pow(10, player.hacks[1].e))%5 == 1) {
			buy('1');
			buy('1');
			buy('1');
			buy('1');
		} else if (parseInt(player.hacks[1].m*Math.pow(10, player.hacks[1].e))%5 == 2) {
			buy('1');
			buy('1');
			buy('1');
		} else if (parseInt(player.hacks[1].m*Math.pow(10, player.hacks[1].e))%5 == 3) {
			buy('1');
			buy('1'); 
		} else if (parseInt(player.hacks[1].m*Math.pow(10, player.hacks[1].e))%5 == 4) {
			buy('1');
		}
	//Hacker
	} else if (stuff == "2") {
		if (parseInt(player.hackers[1].m*Math.pow(10, player.hackers[1].e))%5 == 0) {
			buy('2');
			buy('2');
			buy('2');
			buy('2');
			buy('2');
		} else if (parseInt(player.hackers[1].m*Math.pow(10, player.hackers[1].e))%5 == 1) {
			buy('2');
			buy('2');
			buy('2');
			buy('2');
		} else if (parseInt(player.hackers[1].m*Math.pow(10, player.hackers[1].e))%5 == 2) {
			buy('2');
			buy('2');
			buy('2');
		} else if (parseInt(player.hackers[1].m*Math.pow(10, player.hackers[1].e))%5 == 3) {
			buy('2');
			buy('2'); 
		} else if (parseInt(player.hackers[1].m*Math.pow(10, player.hackers[1].e))%5 == 4) {
			buy('2');
		}
	//Trainer
	} else if (stuff == "3") {
		if (parseInt(player.trainers[1].m*Math.pow(10, player.trainers[1].e))%5 == 0) {
			buy('3');
			buy('3');
			buy('3');
			buy('3');
			buy('3');
		} else if (parseInt(player.trainers[1].m*Math.pow(10, player.trainers[1].e))%5 == 1) {
			buy('3');
			buy('3');
			buy('3');
			buy('3');
		} else if (parseInt(player.trainers[1].m*Math.pow(10, player.trainers[1].e))%5 == 2) {
			buy('3');
			buy('3');
			buy('3');
		} else if (parseInt(player.trainers[1].m*Math.pow(10, player.trainers[1].e))%5 == 3) {
			buy('3');
			buy('3'); 
		} else if (parseInt(player.trainers[1].m*Math.pow(10, player.trainers[1].e))%5 == 4) {
			buy('3');
		}
	//Master
	} else if (stuff == "4") {
		if (parseInt(player.masters[1].m*Math.pow(10, player.masters[1].e))%5 == 0) {
			buy('4');
			buy('4');
			buy('4');
			buy('4');
			buy('4');
		} else if (parseInt(player.masters[1].m*Math.pow(10, player.masters[1].e))%5 == 1) {
			buy('4');
			buy('4');
			buy('4');
			buy('4');
		} else if (parseInt(player.masters[1].m*Math.pow(10, player.masters[1].e))%5 == 2) {
			buy('4');
			buy('4');
			buy('4');
		} else if (parseInt(player.masters[1].m*Math.pow(10, player.masters[1].e))%5 == 3) {
			buy('4');
			buy('4'); 
		} else if (parseInt(player.masters[1].m*Math.pow(10, player.masters[1].e))%5 == 4) {
			buy('4');
		}
	//Efficiency
	} else if (stuff == "ef") {
		while (player.money.gte(costs.efficiency)) {
			buy('ef');
		}
	}
}
function unlock () {
	//Unlock Hacker
	if (player.resets.equals(new Decimal(0))) {
		if (player.hacks[0].gte(new Deicmal(10))) {
			player.resets = new Decimal(1),
			player.hacks = [player.hacks[0].minus(10), player.hacks[1].minus(10)];
		}
	} 
	//Unlock Trainer
	if (player.resets.equals(new Decimal(1))) {
		if (player.hackers[0].gte(new Decimal(10))) {
			player.resets = new Decimal(2),
			player.hacks = [new Decimal(0), new Decimal(0)]
			player.hackers = [player.hackers[0].minus(10), player.hackers[1].minus(10)];
		}
	}
	//Unlock Master
	if (player.resets.equals(new Decimal(2))) {
		if (player.trainers[0].gte(new Decimal(10))) {
			player.resets = new Decimal(3),
			player.hacks = [new Decimal(0), new Decimal(0)];
			player.hackers = [new Decimal(0), new Decimal(0)];
			player.trainers = [player.trainers[0].minus(10), player.trainers[1].minus(10)];
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