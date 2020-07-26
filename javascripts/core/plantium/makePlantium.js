function buyMach() {
	if (player.money.lt(Decimal.pow(1e8, player.machine).mul(1e14)) || player.machine >= 10) return;
	player.machine++;
}
function makePlantium() {
	alert(`The machine explodes violently. It destroys everything you haad previously. Amazingly, you, and the machine, are left unfazed.

The machine outputs a glowing orb. It seems to be an extremely powerful substance, and potentially destructive. You decide to call it plantium because, uh, you couldn't think of a better name.

Will it prove itself to be useful?`)
}