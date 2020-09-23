function buyMach() {
	if (player.money.lt(Decimal.pow(1e8, player.machine).mul(1e14)) || player.machine >= 10) return;
	player.money = player.money.sub(Decimal.pow(1e8, player.machine).mul(1e14));
	player.machines = player.machines.add(1);
}
function makePlantium() {
	if (player.plants.picked.lt(1e15) || player.honey.lt(1e10) || player.plantiumprocess > 2) return;
	player.plantiumprocess = 2;
	function pbarplus() {
		player.plantiumprocess += 98/400;
		if (player.plantiumprocess < 100) setTimeout(pbarplus, 50);
		else {
			prestige(["plantium", "machines", "generators"]);
			if (player.plantium.lt(1)) {
				let temp = player.option.theme;
				player.option.theme = "a";
				setTimeout(()=>player.option.theme=temp, 30);
			}
			player.plantium = player.plantium.add(1);
			player.plantiumprocess = 2;
			player.tutorial.madeFirstPlantium = true;
		}
	}
	pbarplus();
}
