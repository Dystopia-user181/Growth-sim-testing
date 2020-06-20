function save() {
	localStorage.setItem("growthsimsave", JSON.stringify(player));
	console.log("Game saved.");
}
setInterval(save, 10000);