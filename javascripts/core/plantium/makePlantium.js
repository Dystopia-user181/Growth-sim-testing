function buyMach() {
	if (player.machines.gte(1)) {
		if (player.plantium.lt(Decimal.pow(10, player.machines).mul(1e2))) return;
		player.plantium = player.plantium.sub(Decimal.pow(10, player.machines).mul(1e2));
		player.machines = player.machines.add(1);
		return;
	}
	if (player.money.lt(1e14)) return;
	player.money = player.money.sub(1e14);
	player.machines = player.machines.add(1);
}
function makePlantium() {
	if (player.plants.picked.lt(player.plantiumplantamt) || player.honey.lt(player.plantiumplantamt.div(10)) || player.plantiumprocess > 2) return;
	player.plantiumprocess = 2;
	player.onplantiumgain = player.plants.picked.div(player.plantiumplantamt).min(player.honey.div(player.plantiumplantamt.div(10)).min(player.machines.mul(vm.pus[5].bought?5:1)));
	function pbarplus() {
		if (vm.pus[1].bought) {
			player.plantiumprocess += 98/2;
			player.plants.picked = player.plants.picked.sub(player.onplantiumgain.mul(player.plantiumplantamt.mul(0.5))).max(0);
			player.honey = player.honey.sub(player.onplantiumgain.mul(player.plantiumplantamt.mul(0.05))).max(0);
		} else {
			player.plantiumprocess += 98/400;
			player.plants.picked = player.plants.picked.sub(player.onplantiumgain.mul(player.plantiumplantamt.mul(0.0025)));
			player.honey = player.honey.sub(player.onplantiumgain.mul(player.plantiumplantamt.mul(0.00025)));
		}
		if (player.plantiumprocess <= 100) setTimeout(pbarplus, 50);
		else {
			if (!vm.pus[2].bought) prestige(["plantium", "machines", "generators", "plantiumupgrades", "onplantiumgain"]);
			if (player.plantium.lt(1)) {
				window.tmp = player.option.theme;
				player.option.theme = "Dark";
				setTimeout(()=>player.option.theme=window.tmp, 30);
			}
			player.plantium = player.plantium.add(player.onplantiumgain.mul(Decimal.pow(1.5, player.plantiumplantamt.log10()-15)));
			player.plantiumprocess = 2;
			player.tutorial.madeFirstPlantium = true;
		}
	}
	pbarplus();
}