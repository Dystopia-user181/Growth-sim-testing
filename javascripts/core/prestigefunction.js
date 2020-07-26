function prestige(keystokeep) {
	var keys = {};
	keystokeep.forEach(function (item) {
		keys[item] = player[item];
	});
	player = initPlayer;
	keystokeep.forEach(function (key) {
		player[key] = keys[key];
	});
}