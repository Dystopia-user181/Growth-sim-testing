function save() {
	localStorage.setItem("growthsimsave", JSON.stringify(player));
	console.log("Game saved.");
}
function togglesave() {
	player.option.autosave = !player.option.autosave;
	$("autosave?").innerText=`Autosave: ${getnff(player.option.autosave)}`;
}
function reset() {
	if (confirm("Do you want to reset your save?")) {
		setTimeout(function () {
			if (prompt("Type RESET in caps to confirm.") === "RESET") {
				player = initPlayer;
			}
		}, 400);
	}
}
setInterval(function() {
	if (player.option.autosave) save();
}, 10000);