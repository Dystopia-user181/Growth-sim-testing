function unplant() {
	player.plantUnpicked = player.plantUnpicked.sub(1);
	player.plantPicked = player.plantPicked.add(1);
	player.unlockedSell = true;
}
setInterval(function () {player.plantUnpicked = player.plantUnpicked.add(1)}, 1000);
function sell() {
	player.plantPicked = player.plantPicked.sub(1);
	player.money = player.money.add(plantSell);
}