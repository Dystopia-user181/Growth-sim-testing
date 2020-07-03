function grow() {
	player.plantPicked = player.plantPicked.add(player.plantPicked.min(player.container).pow(player.containerLevel/5+1));
	if (player.plantPicked.gt(1000)) player.tutorial.unlockedHoneybee = true;
}
setInterval(grow, 1000);
function upCvt() {
	if (player.money.lt(Decimal.pow(2e4, player.containerLevel+1))) return;
	player.containerLevel += 1;
	player.money = player.money.sub(Decimal.pow(2e4, player.containerLevel));
}