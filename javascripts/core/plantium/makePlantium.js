function buyMach() {
	if (player.money.lt(Decimal.pow(1e8, player.machine).mul(1e14)) || player.machine >= 10) return;
	player.money = player.money.sub(Decimal.pow(1e8, player.machine).mul(1e14));
	player.machine++;
}
function makePlantium() {
	if (player.plants.picked.lt(1e15) || player.honey.lt(1e10) || player.plantiumprocess) return;
	player.plantiumprocess = true;
	$("pbar1").style.transition = "all 20s linear";
	setTimeout(function () {
		$("pbar1").style.width = "100%";
	});
	setTimeout(function () {
		prestige(["plantium", "machine", "generators"]);
		player.plantium = player.plantium.add(1);
		player.plantiumprocess = false;
		$("pbar1").style.transition = "";
		$("pbar1").style.width = "2%";
		player.tutorial.madeFirstPlantium = true;
	}, 20100);
}