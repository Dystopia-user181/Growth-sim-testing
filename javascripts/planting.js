function unplant() {
	if (player.plantUnpicked.lte(0)) return;
	player.plantUnpicked = player.plantUnpicked.sub(1);
	player.plantPicked = player.plantPicked.add(1);
	player.tutorial.unlockedSell = true;
}
setInterval(function () {player.plantUnpicked = player.plantUnpicked.add(1)}, 1000);
function sell() {
	if (player.plantPicked.lte(0)) return;
	player.plantPicked = player.plantPicked.sub(1);
	player.money = player.money.add(plantSell/10);
	if (player.money.gte(100)) player.tutorial.unlockedPot = true;
}
function buyCvt() {
	if (player.money.lt(player.container.mul(5).add(20))) return;
	player.container = player.container.add(1);
	player.money = player.money.sub(20);
}