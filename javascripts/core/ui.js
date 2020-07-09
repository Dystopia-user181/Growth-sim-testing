function updateUI() {
	$("plants").innerText = toSci(player.plantPicked, 0);
	$("plantsUn").innerText = toSci(player.plantUnpicked, 0);
	$("moneycount").innerText = toSci(player.money, 2);
	$("price").innerText = toSci(Decimal.pow(1.1, player.marketing).mul(plantSell/10), 2);
	$("honeyprice").innerText = toSci(Decimal.pow(1.1, player.marketing).mul(plantSell/2), 2);
	$("cvts").innerText = toSci(player.container, 0);
	$("cvtprice").innerText = toSci(player.container.mul(5).add(20), 2);
	$("upcvtprice").innerText = toSci(Decimal.pow(2e4, player.containerLevel).mul(2e4, 2));
	$("cvtlevel").innerText = toSci(player.containerLevel, 0);
	$("bees").innerText = toSci(player.bee, 0);
	$("honey").innerText = toSci(player.honey, 0);
	$("marketingLevel").innerText = toSci(player.marketing, 0);
	$("marketingPrice").innerText = toSci(Decimal.pow(1e5, player.marketing).mul(1e3), 2);
	$("sellplant").style.display = getInlineDisplay(player.tutorial.unlockedSell);
	$("moneys").style.display = getDisplay(player.tutorial.unlockedSell);
	$("Pots").style.display = getDisplay(player.tutorial.unlockedPot);
	$("Bees").style.display = getDisplay(player.tutorial.unlockedHoneybee);
	$("Plants2").style.display = getDisplay(player.tutorial.unlockedMarketing);
	$("buyAutomatorSellPlant").style.display = getDisplay(!player.automatorUnlocked.sellPlant);
	$("plantAuto").style.display = getDisplay(player.automatorUnlocked.sellPlant);
	$("buyAutomatorSellHoney").style.display = getDisplay(!player.automatorUnlocked.sellHoney);
	$("honeyAuto").style.display = getDisplay(player.automatorUnlocked.sellHoney);
	player.version = "0.0.0.4";
}
function getDisplay (trueFalse) {
	if (trueFalse) return "block"; else return "none";
}
function getInlineDisplay (trueFalse) {
	if (trueFalse) return "inline-block"; else return "none";
}
setInterval(updateUI, 50);
function invert() {
	$("html").style.filter=="invert(0)" ? $("html").style.filter="invert(1)" : $("html").style.filter="invert(0)";
}