function buyMach() {
	if (player.money.lt(Decimal.pow(1e8, player.machine).mul(1e14)) || player.machine >= 10) return;
	player.money = player.money.sub(Decimal.pow(1e8, player.machine).mul(1e14));
	player.machines = player.machines.add(1);
}
function makePlantium() {
	if (player.plantPicked.lt(1e15) || player.honey.lt(1e10) || player.plantiumprocess) return;
	player.plantiumprocess = true;
	function pbarplus() {
		player.plantiumprocess += 98/400;
		if (player.plantiumprocess < 100) setTimeout(pbarplus, 50);
		else {
			prestige(["plantium", "machine", "generators"]);
			player.plantium = player.plantium.add(1);
			player.plantiumprocess = 2;
			player.tutorial.madeFirstPlantium = true;
		}
	}
	pbarplus();
}
