function updateUI() {
	$("plants").innerText = toSci(player.plantPicked, 0);
	$("plantsUn").innerText = toSci(player.plantUnpicked, 0);
	$("moneycount").innerText = toSci(player.money, 2);
	$("price").innerText = toSci(Decimal.pow(1.1, player.marketing).mul(plantSell/5), 2);
	$("priceof10").innerText = toSci(Decimal.pow(1.1, player.marketing).mul(plantSell*2), 2);
	$("honeyprice").innerText = toSci(Decimal.pow(1.1, player.marketing).mul(plantSell/2), 2);
	$("10honeyprice").innerText = toSci(Decimal.pow(1.1, player.marketing).mul(plantSell*5), 2);
	$("cvts").innerText = toSci(player.container, 0);
	$("hives").innerText = toSci(player.hive, 0);
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
	$("honeycombamt").innerText = toSci(player.honeycomb, 0);
	$("honeycombpersec").innerText = toSci(player.hive.pow(2), 0);
	$("combeffect").innerText = toSci(player.honeycomb.pow(0.3).add(1), 2);
	$("cvtlevel").innerText = toSci(player.containerLevel, 0);
	$("bees").innerText = toSci(player.bee, 0);
	$("honey").innerText = toSci(player.honey, 0);
	$("marketingLevel").innerText = toSci(player.marketing, 0);
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
	player.version = "0.0.0.4";
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