function load(save, isOnload=false) {
	if (typeof save !== "object") return;
	if (save === null) return;
	if (save.version !== "1.0.0.0-vue") {
		alert("Save is from an older version and thus is incompatible with the newer version.");
		if (isOnload) {
			localStorage.setItem("growthsimsave", JSON.stringify(initPlayer));
			localStorage.setItem("growthsimofflineprogress", JSON.stringify(new Date().getTime()))
			location.reload();
		}
		return;
	}
	player = runParse(save, initPlayer);
	if (player.plantiumprocess > 2) {
		function pbarplus() {
			if (vm.pus[1].bought) {
				player.plantiumprocess += 98/2;
				player.plants.picked = player.plants.picked.sub(player.onplantiumgain.mul(5e14)).max(0);
				player.honey = player.honey.sub(player.onplantiumgain.mul(5e13)).max(0);
			} else {
				player.plantiumprocess += 98/400;
				player.plants.picked = player.plants.picked.sub(player.onplantiumgain.mul(2.5e12));
				player.honey = player.honey.sub(player.onplantiumgain.mul(2.5e11));
			}
			if (player.plantiumprocess <= 100) setTimeout(pbarplus, 50);
			else {
				if (!vm.pus[2].bought) prestige(["plantium", "machines", "generators", "plantiumupgrades", "onplantiumgain"]);
				if (player.plantium.lt(1)) {
					window.tmp = player.option.theme;
					player.option.theme = "Dark";
					setTimeout(()=>player.option.theme=window.tmp, 30);
				}
				player.plantium = player.plantium.add(player.onplantiumgain.mul(Decimal.pow(1.5, player.plantiumplantamt.log(10)-15)));
				player.plantiumprocess = 2;
				player.tutorial.madeFirstPlantium = true;
			}
		}
		setTimeout(pbarplus, 100);
	}
}
function runParse(obj, obj2) {
	Object.keys(obj2).forEach(function (key, index) {
		if (key != "proto") {
			if (obj[key] === undefined) {
				obj[key] = obj2[key];
			} else if (typeof obj[key] === "string" && typeof obj2[key] === "object" && !isNaN(new Decimal(obj[key]).e)) {
				obj[key] = new Decimal(obj[key]);
			} else if (typeof obj2[key] === "object" && typeof obj[key] === "object") {
				runParse(obj[key], obj2[key]);
			} else if (typeof obj[key] != typeof obj2[key]) {
				obj[key] = obj2[key];
			}
		}
	});
	return (obj);
}
var parsedsave = JSON.parse(localStorage.getItem("growthsimsave"));
if (localStorage.getItem("growthsimsave") !== null) {
	load(parsedsave, true);
	setTimeout(function () {
		for (var i = 0; i < 1000; i++) {
			mainGameLoop((new Date().getTime()-JSON.parse(localStorage.getItem("growthsimofflineprogress")))/1000000);
		}
	}, 50);
} else {
	localStorage.setItem("growthsimsave", JSON.stringify(initPlayer));
	localStorage.setItem("growthsimofflineprogress", JSON.stringify(new Date().getTime()))
	location.reload();
}
function expo() {
	var sv = document.getElementById("savetext");
	sv.style.display = "block";
	sv.focus();
	sv.select();
	document.execCommand('copy');
	sv.style.display = "none";
}
function impo() {
	load(JSON.parse(atob(prompt("Paste your save here."))));
	location.reload();
}