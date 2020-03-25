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
	multi.hacks = Decimal.pow(2, player.resets).times(Decimal.pow(2, player.hacks[1].dividedBy(5).floor()));
	multi.hackers = Decimal.pow(2, player.resets.minus(1)).times(Decimal.pow(2, player.hackers[1].dividedBy(5).floor()));
	multi.trainers = Decimal.pow(2, player.resets.minus(2)).times(Decimal.pow(2, player.trainers[1].dividedBy(5).floor()));
	multi.masters = Decimal.pow(2, player.resets.minus(3)).times(Decimal.pow(2, player.masters[1].dividedBy(5).floor()));
	player.efficiency = Decimal.pow(1.1, player.efficiencies);
	//Stats
	document.getElementById("buyHack").innerHTML = "$" + formatNotation(costs.hacks, true);
	document.getElementById("1").innerHTML = "Hacks ×" + formatNotation(multi.hacks, true);
	document.getElementById("buyHacker").innerHTML = "$" + formatNotation(costs.hackers, true);
	document.getElementById("2").innerHTML = "Hackers ×" + formatNotation(multi.hackers, true);
	document.getElementById("buyTrainer").innerHTML = "$" + formatNotation(costs.trainers, true);
	document.getElementById("3").innerHTML = "Trainers ×" + formatNotation(multi.trainers, true);
	document.getElementById("buyMaster").innerHTML = "$" + formatNotation(costs.masters, true);
	document.getElementById("4").innerHTML = "Masters ×" + formatNotation(multi.masters, true);
	document.getElementById("buyEfficiency").innerHTML = "$" + formatNotation(costs.efficiency, true);
	document.getElementById("efficiencyStat").innerHTML = "Efficiency: " + formatNotation(player.efficiency, true);
	document.getElementById("reshuffleStat").innerHTML = "Code Reshuffle (" + formatNotation(player.resets, false) + "): Requires " + formatNotation(costs.unlock, false) + " CodeMasters";
	if (player.money.e < 50) {
		//Money
		document.getElementById("money").innerHTML = "You have generated <span id = 'moneyAmount'>$" + formatNotation(player.money, true) + "</span>.";
		document.getElementById("0perSec").innerHTML = "You are generating $" + formatNotation(player.hacks[0].floor().times(multi.hacks).times(player.efficiency), true) + " every second.";
		//Hack
		player.money = player.money.add((player.hacks[0].floor().dividedBy(20)).times(multi.hacks).times(player.efficiency));
		document.getElementById("1stat").innerHTML = formatNotation(player.hacks[0], false) + " (" + formatNotation(new Decimal(player.hacks[1].m*Math.pow(10, player.hacks[1].e)%5), false) + ")";
		indicateBuy(costs.hacks, "buyHack")
		//Hacker
		player.hacks[0] = player.hacks[0].add((player.hackers[0].dividedBy(40)).times(multi.hackers).times(player.efficiency));
		player.hacks[0] = player.hacks[0].add((player.trainers[0].dividedBy(8)).times(multi.trainers).times(player.efficiency));
		player.hacks[0] = player.hacks[0].add((player.masters[0].dividedBy(1.6)).times(multi.masters).times(player.efficiency));
		document.getElementById("2stat").innerHTML = formatNotation(player.hackers[0], false) + " (" + formatNotation(new Decimal(player.hackers[1].m*Math.pow(10, player.hackers[1].e)%5), false) + ")";
		indicateBuy(costs.hackers, "buyHacker");
		//Trainer
		player.hackers[0] = player.hackers[0].add((player.trainers[0].dividedBy(200)).times(multi.trainers).times(player.efficiency));
		player.hackers[0] = player.hackers[0].add((player.masters[0].dividedBy(40)).times(multi.masters).times(player.efficiency));
		document.getElementById("3stat").innerHTML = formatNotation(player.trainers[0], false) + " (" + formatNotation(new Decimal(player.trainers[1].m*Math.pow(10, player.trainers[1].e)%5), false) + ")";
		indicateBuy(costs.trainers, "buyTrainer");
		//Master
		player.trainers[0] = player.trainers[0].add((player.masters[0].dividedBy(500)).times(multi.masters).times(player.efficiency));
		document.getElementById("4stat").innerHTML = formatNotation(player.masters[0], false) + " (" + formatNotation(new Decimal(player.masters[1].m*Math.pow(10, player.masters[1].e)%5), false) + ")";
		indicateBuy(costs.masters, "buyMaster");
		//Efficiency
		indicateBuy(costs.efficiency, "buyEfficiency");
		//Unlock Hackers
		indicateUnlock(player.hacks[0], "unlockHacker");
		//Unlock Trainers
		indicateUnlock(player.hackers[0], "unlockTrainer");
		//Unlock Masters
		indicateUnlock(player.trainers[0], "unlockMaster");
		//Update on shifts
		if (player.resets.equals(new Decimal(1))) {
			document.getElementById("hacker").style.display = "table-row";
			document.getElementById("trainer").style.display = "none";
			document.getElementById("master").style.display = "none";
			document.getElementById("layer2").style.display = "none";
			document.getElementById("layer3").style.display = "table-row";
			document.getElementById("layer4").style.display = "none";
			document.getElementById("reshuffle").style.display = "none";
		} else if (player.resets.equals(new Decimal(2))) {
			document.getElementById("hacker").style.display = "table-row";
			document.getElementById("trainer").style.display = "table-row";
			document.getElementById("master").style.display = "none";
			document.getElementById("layer2").style.display = "none";
			document.getElementById("layer3").style.display = "none";
			document.getElementById("layer4").style.display = "table-row";
			document.getElementById("reshuffle").style.display = "none";
		} else if (player.resets.gte(new Decimal(3))) {
			document.getElementById("hacker").style.display = "table-row";
			document.getElementById("trainer").style.display = "table-row";
			document.getElementById("master").style.display = "table-row";
			document.getElementById("layer2").style.display = "none";
			document.getElementById("layer3").style.display = "none";
			document.getElementById("layer4").style.display = "none";
			document.getElementById("reshuffle").style.display = "table-row";
		} else {
			document.getElementById("hacker").style.display = "none";
			document.getElementById("trainer").style.display = "none";
			document.getElementById("master").style.display = "none";
			document.getElementById("layer2").style.display = "table-row";
			document.getElementById("layer3").style.display = "none";
			document.getElementById("layer4").style.display = "none";
			document.getElementById("reshuffle").style.display = "none";
		}
		//Boost
		if (player.masters[0].gte(costs.unlock)) {
			document.getElementById("buyReshuffle").style.border = "2px solid green";
			document.getElementById("buyReshuffle").style.backgroundColor = buttonTheme.available;
			if (player.neon) {
				document.getElementById("buyReshuffle").style.boxShadow = "0px 0px 8px 1px green";
			} else {
				document.getElementById("buyReshuffle").style.boxShadow = "0px 0px";
			}
		} else {
			document.getElementById("buyReshuffle").style.border = "2px solid red";
			document.getElementById("buyReshuffle").style.backgroundColor = buttonTheme.unAvailable;
			if (player.neon) {
				document.getElementById("buyReshuffle").style.boxShadow = "0px 0px 8px 1px red";
			} else {
				document.getElementById("buyReshuffle").style.boxShadow = "0px 0px";
			}
		}
	}
	//Corrupted Matrix
	if (player.money.e >= 50) {
		document.getElementById("inGame").style.display = "none";
		document.getElementById("corruptPreBreak").style.display = "initial";
	} else {
		document.getElementById("inGame").style.display = "initial";
		document.getElementById("corruptPreBreak").style.display = "none";
	}
	//Matrix Points
	document.getElementById("mpAmount").innerHTML = player.matrixPoints.toString();
	if (player.matrixStat.gte(new Decimal(1))) {
		document.getElementById("matrixPoints").style.display = "initial";
	} else {
		document.getElementById("matrixPoints").style.display = "none";
	}
	//Update the Theme
	updateTheme();
	document.getElementById("themes").innerHTML = "Theme: " + player.theme;
	//Time
	player.timePlayed = (new Date()).getTime();
}
var saveClock;
saveClock = setInterval(function() {save()}, 1000);