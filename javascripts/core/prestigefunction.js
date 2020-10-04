function prestige(keystokeep) {
	keystokeep.push("navigation", "version", "tutorial", "option", "display");
	var keys = {};
	console.log(keystokeep);
	keystokeep.forEach(function (item) {
		console.log(keys[item]);
		keys[item] = runParse(JSON.parse(JSON.stringify(player[item])), initPlayer[item]);
	});
	console.log(keystokeep);
	console.log(keys);
	player = reseter(player, initPlayer);
	keystokeep.forEach(function (key) {
		player[key] = keys[key];
	});
	player.tutorial.madeFirstPlantium = true;
	load(player);
}