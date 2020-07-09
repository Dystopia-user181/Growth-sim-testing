function grow() {
	var prevPlants = player.plantPicked;
	player.plantPicked = player.plantPicked.add(player.plantPicked.min(player.container).pow(player.containerLevel/3+1).mul(player.honey.add(1).pow(0.2)));
	prevPlants = player.plantPicked.sub(prevPlants);
	player.money = player.money.add(prevPlants.mul(player.automator.sellPlant).mul(Decimal.pow(1.1, player.marketing).mul(plantSell/10)));
	player.plantPicked = player.plantPicked.sub(prevPlants.mul(player.automator.sellPlant));
	if (player.plantPicked.gt(1000)) player.tutorial.unlockedHoneybee = true;
}
setInterval(grow, 1000);
function upCvt() {
	if (player.money.lt(Decimal.pow(2e4, player.containerLevel.add(1)))) return;
	player.containerLevel = player.containerLevel.add(1);
	player.money = player.money.sub(Decimal.pow(2e4, player.containerLevel));
}
function buyMaxCvt() {
	return;
}