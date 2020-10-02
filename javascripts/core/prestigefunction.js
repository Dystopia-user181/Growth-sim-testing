function prestige(keystokeep) {
	keystokeep.push("navigation", "version", "tutorial", "option", "display");
	var keys = {};
	keystokeep.forEach(function (item) {
		keys[item] = player[item];
	});
	console.log(keys);
	player = initPlayer;
	keystokeep.forEach(function (key) {
		player[key] = keys[key];
	});
	vm._data.player = player;
	vm.player = player;
	vm.$forceUpdate();
	player.tutorial.madeFirstPlantium = true;
}