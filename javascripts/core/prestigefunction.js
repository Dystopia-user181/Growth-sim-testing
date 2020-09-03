function prestige(keystokeep) {
	keystokeep.push("navigation", "version", "tutorial", "option");
	var keys = {};
	keystokeep.forEach(function (item) {
		keys[item] = player[item];
	});
	console.log(keys);
	player = initPlayer;
	keystokeep.forEach(function (key) {
		player[key] = keys[key];
	});
	mainVue.player = player;
	mainVue.$forceUpdate();
	player.tutorial.madeFirstPlantium = true;
}