function grow() {
	player.plantPicked = player.plantPicked.add(player.plantPicked.min(player.container).pow(player.containerLevel/5+1));
}
setInterval(grow, 500);