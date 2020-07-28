function prestige(keystokeep) {
	keystokeep.push("navigation", "version", "tutorial", "option");
	var keys = {
		navigation: player.navigation, 
		tutorial: player.tutorial, 
		version: player.version,
		option: player.option
	};
	keystokeep.forEach(function (item) {
		keys[item] = player[item];
	});
	player = initPlayer;
	keystokeep.forEach(function (key) {
		player[key] = keys[key];
	});
}