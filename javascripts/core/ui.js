function updateUI() {
	$("plants").innerText = toSci(player.plantPicked, 0);
	$("plantsUn").innerText = toSci(player.plantUnpicked, 0);
	$("moneycount").innerText = toSci(player.money, 2);
	$("price").innerText = toSci(plantSell/10, 2);
	$("honeyprice").innerText = toSci(plantSell/2, 2);
	$("cvts").innerText = toSci(player.container, 0);
	$("cvtprice").innerText = toSci(player.container.mul(5).add(20), 2);
	$("cvtlevel").innerText = toSci(player.containerLevel, 0);
	$("bees").innerText = toSci(player.bee, 0);
	$("honey").innerText = toSci(player.honey, 0);
	(player.tutorial.unlockedSell) ? $("sellplant").style.visibility = "visible" : $("sellplant").style.visibility = "hidden";
	(player.tutorial.unlockedSell) ? $("moneys").style.visibility = "visible" : $("moneys").style.visibility = "hidden";
	(player.tutorial.unlockedSell) ? $("priceSpan").style.visibility = "visible" : $("priceSpan").style.visibility = "hidden";
	(player.tutorial.unlockedPot) ? $("Pots").style.visibility = "visible" : $("Pots").style.visibility = "hidden";
	(player.tutorial.unlockedHoneybee) ? $("Bees").style.visibility = "visible" : $("Bees").style.visibility = "hidden";
	(player.tutorial.unlockedMarketing) ? $("Plants2").style.visibility = "visible" : $("Plants2").style.visibility = "hidden";
	player.version = "0.0.0.3";
}
setInterval(updateUI, 50);
function invert() {
	$("html").style.filter=="invert(0)" ? $("html").style.filter="invert(1)" : $("html").style.filter="invert(0)";
}