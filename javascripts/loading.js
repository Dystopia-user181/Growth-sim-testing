function load(save) {
	if (typeof save !== "object") return;
	if (save === null) return;
	if (save.version !== "1.0.0.0-vue") {
		alert("Save is from an older version and thus is incompatible with the newer version.");
		return;
	}
	player = runParse(save, initPlayer);
	if (player.plantiumprocess > 2) {
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
	load(parsedsave);
}
function expo() {
	var sv = $("savetext");
	sv.style.display = "block";
	sv.focus();
	sv.select();
	document.execCommand('copy');
	sv.style.display = "none";
}
function impo() {
	load(JSON.parse(atob(prompt("Paste your save here."))));
	vm.player = player;
	vm.$forceUpdate();
}

/*try {
	vm._data.player = player;
	vm.player = player;
} catch (e) {
	console.log("First load with Vue");
}*/