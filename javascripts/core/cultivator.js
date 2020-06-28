function grow() {
	player.plantPicked = player.plantPicked.add(player.plantPicked.min(player.container).pow(player.containerLevel/5+1));
	if (player.plantPicked.gt(1000)) player.tutorial.unlockedHoneybee = true;
}
setInterval(grow, 1000);