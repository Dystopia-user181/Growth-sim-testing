function save() {
	localStorage.setItem("growthsimsave", JSON.stringify(player));
	localStorage.setItem("growthsimofflineprogress", JSON.stringify(new Date().getTime()));
	console.log("Game saved.");
}
function reseter(obj, obj2) {
	Object.keys(obj2).forEach(function (key, index) {
		if (key != "proto") {
			if (typeof obj2[key] === "object" && typeof obj[key] === "object") {
				reseter(obj[key], obj2[key]);
			} else {
				obj[key] = obj2[key];
			}
		}
	});
	return (obj);
}
function reset() {
	if (confirm("Do you want to reset your save?")) {
		setTimeout(function () {
			if (prompt("Type RESET in caps to confirm.") === "RESET") {
				player = reseter(player, initPlayer);
			}
		}, 400);
	}
}
setInterval(function() {
	if (player.option.autosave) save();
}, 10000);