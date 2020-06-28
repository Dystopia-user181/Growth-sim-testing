function addHoneyBee() {
	if (player.tutorial.unlockedHoneybee) {
		player.bee = player.bee.add(player.plantUnpicked.pow(0.55)).min(player.plantUnpicked.div(50));
	}
}
setInterval(addHoneyBee, 2000);