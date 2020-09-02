function prestige(keystokeep) {
	keystokeep.push("navigation", "version", "tutorial", "option");
	var keys = {};
	keystokeep.forEach(function (item) {
		keys[item] = player[item];
	});
	player = reseter(player, initPlayer);
	keystokeep.forEach(function (key) {
		player[key] = keys[key];
	});
}