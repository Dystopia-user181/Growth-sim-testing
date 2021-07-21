function prestige(keystokeep) {
	keystokeep.push("navigation", "version", "tutorial", "option", "display");
	var keys = {};
	keystokeep.forEach(function (item) {
		keys[item] = runParse(JSON.parse(JSON.stringify(player[item])), initPlayer[item]);
	});
	player = reseter(player, initPlayer);
	keystokeep.forEach(function (key) {
		player[key] = keys[key];
	});
	player.tutorial.madeFirstPlantium = true;
	load(player);
}