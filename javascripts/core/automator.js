function buyAuto(name, cost, currency="money") {
	if (player[currency].lt(cost) || player.automatorUnlocked[name]) return;
	player.automatorUnlocked[name] = true;
	player[currency] = player[currency].sub(cost);
}
function toggleAuto(name) {
	player.automator[name] = !player.automator[name];
}