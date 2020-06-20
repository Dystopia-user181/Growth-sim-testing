function updateUI() {
	$("plants").innerText = toSci(player.plantPicked, 0);
	$("plantsUn").innerText = toSci(player.plantUnpicked, 0);
	$("moneycount").innerText = toSci(player.money, 2);
	$("price").innerText = toSci(plantSell, 2);
	(player.unlockedSell) ? $("sellplant").style.visibility = "visible" : $("sellplant").style.visibility = "hidden";
	(player.unlockedSell) ? $("moneys").style.visibility = "visible" : $("moneys").style.visibility = "hidden";
}
setInterval(updateUI, 50);