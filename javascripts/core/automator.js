function buyAuto(name, cost) {
	if (player.money.lt(cost) || player.automatorUnlocked[name]) return;
	player.automatorUnlocked[name] = true;
	player.money = player.money.sub(cost);
}
function updatePlantAuto() {
	player.automator.sellPlant = $("plantinput").value/100;
}
function updateHoneyAuto() {
	player.automator.sellHoney = $("honeyinput").value/100;
}