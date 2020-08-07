function prestige(keystokeep) {
	keystokeep.push("navigation", "version", "tutorial", "option");
	var keys = {};
	keystokeep.forEach(function (item) {
		keys[item] = player[item];
	});
	player = initPlayer;
	keystokeep.forEach(function (key) {
		player[key] = keys[key];
	});
	$("plantinput").value = player.automator.sellPlant*100;
	$("honeyinput").value = player.automator.sellHoney*100;
	$("buycontainer").innerText = getnff(player.automator.buycontainer);
	$("buycontainerup").innerText = getnff(player.automator.buycontainerup);
	$("buymarketing").innerText = getnff(player.automator.buymarketing);
}