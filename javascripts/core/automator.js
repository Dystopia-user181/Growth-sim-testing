function buyAuto(name, cost) {
	if (player.money.lt(cost) || player.automatorUnlocked[name]) return;
	player.automatorUnlocked[name] = true;
	player.money = player.money.sub(cost);
}
function toggleAuto(name) {
	player.automator[name] = !player.automator[name];
}