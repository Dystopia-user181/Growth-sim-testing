function updateUI() {
	$("plants").innerText = toSci(player.plantPicked);
	$("plantsUn").innerText = toSci(player.plantUnpicked);
	$("moneycount").innerText = toSci(player.money, 2);
	$("price").innerText = toSci(Decimal.pow(1.5, player.marketing), 2);
	$("priceof10").innerText = toSci(Decimal.pow(1.5, player.marketing).mul(10), 2);
	$("honeyboost").innerText = toSci(player.honey.add(1).pow(0.2), 2)
	$("honeyprice").innerText = toSci(Decimal.pow(1.5, player.marketing).mul(5), 2);
	$("10honeyprice").innerText = toSci(Decimal.pow(1.5, player.marketing).mul(50), 2);
	$("honeypersec").innerText = toSci(player.bee.min(player.plantUnpicked).pow(0.5).mul(player.honeycomb.pow(0.3).add(1)), 0);
	$("cvts").innerText = toSci(player.container);
	$("hives").innerText = toSci(player.hive);
	if (player.container.lte(200)) {
		$("cvtprice").innerText = toSci(player.container.mul(5).add(20), 2);
	} else {
		$("cvtprice").innerText = toSci(Decimal.pow(1.01, player.container.sub(200)).mul(1000), 2);
	}
	if (player.hive.lte(200)) {
		$("hiveprice").innerText = toSci(player.hive.mul(5).add(20), 2);
	} else {
		$("hiveprice").innerText = toSci(Decimal.pow(1.01, player.hive.sub(200)).mul(1000), 2);
	}
	$("upcvtprice").innerText = toSci(Decimal.pow(2e3, player.containerLevel).mul(2e3), 2);
	$("honeycombamt").innerText = toSci(player.honeycomb);
	$("honeycombpersec").innerText = toSci(player.hive.pow(2));
	$("combeffect").innerText = toSci(player.honeycomb.pow(0.3).add(1), 2);
	$("cvtlevel").innerText = toSci(player.containerLevel);
	$("bees").innerText = toSci(player.bee);
	$("honey").innerText = toSci(player.honey);
	$("marketingLevel").innerText = toSci(player.marketing);
	$("marketingPrice").innerText = toSci(Decimal.pow(1e5, player.marketing).mul(1e3), 2);
	$("sellplant").style.display = getInlineDisplay(player.tutorial.unlockedSell);
	$("sell10plant").style.display = getInlineDisplay(player.tutorial.unlockedSell);
	$("moneys").style.display = getDisplay(player.tutorial.unlockedSell);
	$("tbuPots").style.display = getDisplay((!player.tutorial.unlockedPot) && (player.tutorial.unlockedSell));
	$("tbuAuto").style.display = getDisplay((!player.tutorial.unlockedMarketing) && (player.tutorial.unlockedSell));
	$("Pots").style.display = getDisplay(player.tutorial.unlockedPot);
	$("Bees").style.display = getDisplay(player.tutorial.unlockedHoneybee);
	$("Hives").style.display = getDisplay(player.tutorial.unlockedPot && player.tutorial.unlockedHoneybee);
	$("Plants2").style.display = getDisplay(player.tutorial.unlockedMarketing);
	$("buyAutomatorSellPlant").style.display = getDisplay(!player.automatorUnlocked.sellPlant);
	$("plantAuto").style.display = getDisplay(player.automatorUnlocked.sellPlant);
	$("buyAutomatorSellHoney").style.display = getDisplay(!player.automatorUnlocked.sellHoney);
	$("honeyAuto").style.display = getDisplay(player.automatorUnlocked.sellHoney);
	$("autobuydiv").style.display = getDisplay(player.automatorUnlocked.buycontainer || player.automatorUnlocked.buycontainerup || player.automatorUnlocked.buymarketing);
	$("buyAutomatorSellCvt").style.display = getDisplay(!player.automatorUnlocked.buycontainer);
	$("cvtautospan").style.display = getDisplay(player.automatorUnlocked.buycontainer);
	$("buyAutomatorSellCvtup").style.display = getDisplay(!player.automatorUnlocked.buycontainerup);
	$("cvtautoupspan").style.display = getDisplay(player.automatorUnlocked.buycontainerup);
	$("buyAutomatorSellMark").style.display = getDisplay(!player.automatorUnlocked.buymarketing);
	$("markautospan").style.display = getDisplay(player.automatorUnlocked.buymarketing);
	$("machinetabbtn").style.display = getInlineDisplay(player.tutorial.unlockedMachine);
	$("mach1").style.display = getDisplay(player.machine > 0);
	$("buyMach1").style.display = getDisplay(player.machine <= 0);
	$("machinelore").style.display = getDisplay(player.plantium.gt(0));
	player.version = "0.0.0.5";
	tabTo(player.navigation.tab);
}
function getDisplay (bool) {
	return (bool ? "block" : "none");
}
function getInlineDisplay (bool) {
	return (bool ? "inline-block" : "none");
}
setInterval(updateUI, 50);
function invert() {
	$("html").style.filter=="invert(0)" ? $("html").style.filter="invert(1)" : $("html").style.filter="invert(0)";
	player.option.invert = !player.option.invert;
}