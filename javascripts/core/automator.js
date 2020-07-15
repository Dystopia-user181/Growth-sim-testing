function buyAuto(name, cost) {
	if (player.money.lt(cost) || player.automatorUnlocked[name]) return;
	if (name == "buycontainer" && player.container.lt(200)) return;
	player.automatorUnlocked[name] = true;
	player.money = player.money.sub(cost);
}
function updatePlantAuto() {
	$("plantinput").value = Math.max(Math.min($("plantinput").value, 100), 0);
	player.automator.sellPlant = $("plantinput").value/100;
}
function updateHoneyAuto() {
	$("honeyinput").value = Math.max(Math.min($("honeyinput").value, 100), 0);
	player.automator.sellHoney = $("honeyinput").value/100;
}
function toggleAuto(name) {
	player.automator[name] = !player.automator[name];
	$(name).innerText = getnff(player.automator[name]);
}