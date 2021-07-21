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
function reset() {}

let resets = {
	0: ["money", "automoney", "plants", "bees", "honey", "cvt", "hives", "factories", "honeycombs", "queens",
	"combstructures", "automator", "automatorUnlocked", "plantpow"]
}