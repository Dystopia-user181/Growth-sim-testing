function updateUI() {
	$("plants").innerText = toSci(player.plantPicked, 0);
	$("plantsUn").innerText = toSci(player.plantUnpicked, 0);
	$("moneycount").innerText = toSci(player.money, 2);
	$("price").innerText = toSci(plantSell/10, 2);
	(player.tutorial.unlockedSell) ? $("sellplant").style.visibility = "visible" : $("sellplant").style.visibility = "hidden";
	(player.tutorial.unlockedSell) ? $("moneys").style.visibility = "visible" : $("moneys").style.visibility = "hidden";
	(player.tutorial.unlockedSell) ? $("priceSpan").style.visibility = "visible" : $("price").style.visibility = "hidden";
	player.version = "0.0.0.2";
}
setInterval(updateUI, 50);