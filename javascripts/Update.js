var updateClock;
updateClock = setInterval(function () {update();}, 50);
function update () {
	//Game Presets
	costs.hacks = Decimal.pow(2, player.hacks[1]);
	costs.hackers = Decimal.pow(3, player.hackers[1]).times(100);
	costs.trainers = Decimal.pow(4, player.trainers[1]).times(10000);
	costs.masters = Decimal.pow(5, player.masters[1]).times(1000000);
	costs.efficiency = Decimal.pow(10, player.efficiencies).times(1000);
	costs.unlock = player.resets.times(5);
	multi.hacks = Decimal.pow(2, player.resets).times(Decimal.pow(2, player.hacks[1].dividedBy(5).floor()).mul(Decimal.pow(2, player.computer[3].add(1))));
	multi.hackers = Decimal.pow(2, player.resets.minus(1)).times(Decimal.pow(2, player.hackers[1].dividedBy(5).floor()));
	multi.trainers = Decimal.pow(2, player.resets.minus(2)).times(Decimal.pow(2, player.trainers[1].dividedBy(5).floor()));
	multi.masters = Decimal.pow(2, player.resets.minus(3)).times(Decimal.pow(2, player.masters[1].dividedBy(5).floor()));
	player.efficiency = Decimal.pow(1.1, player.efficiencies);
	//Stats
	$("buyHack").innerHTML = "$" + formatNotation(costs.hacks, true);
	$("1").innerHTML = "Thwarters ×" + formatNotation(multi.hacks, true);
	$("buyHacker").innerHTML = "$" + formatNotation(costs.hackers, true);
	$("2").innerHTML = "Programmers ×" + formatNotation(multi.hackers, true);
	$("buyTrainer").innerHTML = "$" + formatNotation(costs.trainers, true);
	$("3").innerHTML = "Trainers ×" + formatNotation(multi.trainers, true);
	$("buyMaster").innerHTML = "$" + formatNotation(costs.masters, true);
	$("4").innerHTML = "Masters ×" + formatNotation(multi.masters, true);
	$("buyEfficiency").innerHTML = "$" + formatNotation(costs.efficiency, true);
	$("efficiencyStat").innerHTML = "Efficiency: " + formatNotation(player.efficiency, true);
	$("reshuffleStat").innerHTML = "Code Reshuffle (" + formatNotation(player.resets, false) + "): Requires " + formatNotation(costs.unlock, false) + " CodeMasters";
	if (player.money.e < 50) {
		//Money
		$("money").innerHTML = "You have generated <span id = 'moneyAmount'>$" + formatNotation(player.money, true) + "</span>.";
		$("0perSec").innerHTML = "You are generating $" + formatNotation(player.hacks[0].times(multi.hacks).times(player.efficiency), true) + " every second.";
		//Hack
		player.money = player.money.add(player.hacks[0].dividedBy(20).times(multi.hacks).times(player.efficiency));
		$("1stat").innerHTML = formatNotation(player.hacks[0], false) + " (" + formatNotation(new Decimal(player.hacks[1].m*Math.pow(10, player.hacks[1].e)%5), false) + ")";
		indicateBuy(costs.hacks, "buyHack");
		indicateBuy(costs.hacks, "buyHackMax");
		//Hacker
		player.hacks[0] = player.hacks[0].add((player.hackers[0].dividedBy(40)).times(multi.hackers).times(player.efficiency));
		player.hacks[0] = player.hacks[0].add((player.trainers[0].dividedBy(8)).times(multi.trainers).times(player.efficiency));
		player.hacks[0] = player.hacks[0].add((player.masters[0].dividedBy(1.6)).times(multi.masters).times(player.efficiency));
		player.hacks[0] = player.hacks[0].min(maxHacks);
		if (player.hacks[0].equals(maxHacks)) {
			$("hackMaxed").style.visibility = "visible";
		} else {
			$("hackMaxed").style.visibility = "hidden";
		}
		$("2stat").innerHTML = formatNotation(player.hackers[0], false) + " (" + formatNotation(new Decimal(player.hackers[1].m*Math.pow(10, player.hackers[1].e)%5), false) + ")";
		indicateBuy(costs.hackers, "buyHacker");
		indicateBuy(costs.hackers, "buyHackerMax");
		//Trainer
		player.hackers[0] = player.hackers[0].add((player.trainers[0].dividedBy(200)).times(multi.trainers).times(player.efficiency));
		player.hackers[0] = player.hackers[0].add((player.masters[0].dividedBy(40)).times(multi.masters).times(player.efficiency));
		$("3stat").innerHTML = formatNotation(player.trainers[0], false) + " (" + formatNotation(new Decimal(player.trainers[1].m*Math.pow(10, player.trainers[1].e)%5), false) + ")";
		indicateBuy(costs.trainers, "buyTrainer");
		indicateBuy(costs.trainers, "buyTrainerMax");
		//Master
		player.trainers[0] = player.trainers[0].add((player.masters[0].dividedBy(500)).times(multi.masters).times(player.efficiency));
		$("4stat").innerHTML = formatNotation(player.masters[0], false) + " (" + formatNotation(new Decimal(player.masters[1].m*Math.pow(10, player.masters[1].e)%5), false) + ")";
		indicateBuy(costs.masters, "buyMaster");
		indicateBuy(costs.masters, "buyMasterMax");
		//Efficiency
		indicateBuy(costs.efficiency, "buyEfficiency");
		indicateBuy(costs.efficiency, "buyEfficiencyMax");
		//Computer
		indicateBuy(costs.computer[0], "buyComputer");
		indicateBuy(costs.computer[1], "buyServer");
		indicateBuy(costs.computer[2], "buyMemory");
		indicateBuy(costs.computer[3], "buyPower");
		//Unlock Hackers
		indicateUnlock(player.hacks[0], "unlockHacker");
		//Unlock Trainers
		indicateUnlock(player.hackers[0], "unlockTrainer");
		//Unlock Masters
		indicateUnlock(player.trainers[0], "unlockMaster");
		//Update on shifts
		if (player.resets.equals(new Decimal(1))) {
			$("hacker").style.display = "table-row";
			$("trainer").style.display = "none";
			$("master").style.display = "none";
			$("layer2").style.display = "none";
			$("layer3").style.display = "table-row";
			$("layer4").style.display = "none";
			$("reshuffle").style.display = "none";
		} else if (player.resets.equals(new Decimal(2))) {
			$("hacker").style.display = "table-row";
			$("trainer").style.display = "table-row";
			$("master").style.display = "none";
			$("layer2").style.display = "none";
			$("layer3").style.display = "none";
			$("layer4").style.display = "table-row";
			$("reshuffle").style.display = "none";
		} else if (player.resets.gte(new Decimal(3))) {
			$("hacker").style.display = "table-row";
			$("trainer").style.display = "table-row";
			$("master").style.display = "table-row";
			$("layer2").style.display = "none";
			$("layer3").style.display = "none";
			$("layer4").style.display = "none";
			$("reshuffle").style.display = "table-row";
		} else {
			$("hacker").style.display = "none";
			$("trainer").style.display = "none";
			$("master").style.display = "none";
			$("layer2").style.display = "table-row";
			$("layer3").style.display = "none";
			$("layer4").style.display = "none";
			$("reshuffle").style.display = "none";
		}
		//Boost
		if (player.masters[0].gte(costs.unlock)) {
			$("buyReshuffle").className = $("buyReshuffle").className.split(" ")[0]+" yes";
		} else {
			$("buyReshuffle").className = $("buyReshuffle").className.split(" ")[0]+" no";
		}
	}
	//Computer 
	$("computerAmount").innerHTML = formatNotation(player.computer[0], true);
	$("serverAmount").innerHTML = formatNotation(player.computer[1], true);
	$("memory").innerHTML = formatNotation(player.computer[2], true);
	$("power").innerHTML = formatNotation(player.computer[3], true);
	costs.computer[0] = Decimal.pow(5, player.computer[0].minus(1)).mul(1000);
	costs.computer[1] = Decimal.pow(7.5, player.computer[1]).mul(50000);
	costs.computer[2] = Decimal.pow(2, player.computer[2]).mul(2000);
	costs.computer[3] = Decimal.pow(100, player.computer[3]).mul(10000);
	$("buyComputer").innerHTML = "$ "+formatNotation(costs.computer[0], true);
	$("buyServer").innerHTML = "$ "+formatNotation(costs.computer[1], true);
	$("buyMemory").innerHTML = "$ "+formatNotation(costs.computer[2], true);
	$("buyPower").innerHTML = "$ "+formatNotation(costs.computer[3], true);
	//MaxHacks
	maxHacks = player.computer[0].pow(player.computer[0].add(10).log(2)).mul(100).add(player.computer[1].pow(player.computer[1].add(15).log(1.5)).mul(100)).mul(player.computer[2].add(1));
	//Corrupted Matrix
	if (player.money.e >= 50) {
		$("inGame").style.display = "none";
		$("corruptPreBreak").style.display = "initial";
	} else {
		$("inGame").style.display = "initial";
		$("corruptPreBreak").style.display = "none";
	}
	//Matrix Points
	$("mpAmount").innerHTML = formatNotation(player.matrixPoints);
	if (player.matrixStat.gte(new Decimal(1))) {
		$("matrixPoints").style.display = "initial";
	} else {
		$("matrixPoints").style.display = "none";
	}
	//Update the Theme
	updateTheme();
	$("themes").innerHTML = "Theme: " + player.theme;
	//Time
	player.timePlayed = (new Date()).getTime();
}
var saveClock;
saveClock = setInterval(function() {save()}, 1000);