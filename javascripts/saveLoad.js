function save() {
	localStorage.setItem("growthsimsave", JSON.stringify(player));
	localStorage.setItem("growthsimofflineprogress", JSON.stringify(new Date().getTime()));
	console.log("Game saved.");
}
function reseter(obj, obj2) {
	Object.keys(obj2).forEach(function (key, index) {
		if (typeof obj2[key] === "object" && typeof obj[key] === "object") {
			reseter(obj[key], obj2[key]);
		} else {
			obj[key] = obj2[key];
		}
	});
	return (obj);
}
function reset() {
	if (confirm("Do you want to reset your save?")) {
		setTimeout(function () {
			if (prompt("Type RESET in caps to confirm.") === "RESET") {
				player = reseter(player, initPlayer);
				player.batteryArray = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
			}
		}, 400);
	}
}
setInterval(function() {
	if (player.option.autosave) save();
}, 10000);
function load(save, isOnload=false) {
	if (typeof save !== "object") return;
	if (save === null) return;
	if (save.version !== "1.0.0.0-balancing") {
		alert("Save is from an older version and thus is incompatible with the newer version.");
		if (isOnload) {
			localStorage.setItem("growthsimsave", JSON.stringify(initPlayer));
			localStorage.setItem("growthsimofflineprogress", JSON.stringify(new Date().getTime()))
			location.reload();
		}
		return;
	}
	player = runParse(save, initPlayer);
}
function runParse(obj, obj2) {
	Object.keys(obj2).forEach(function (key, index) {
		if (key != "proto") {
			if (obj[key] === undefined) {
				obj[key] = obj2[key];
			} else if (typeof obj[key] === "string" && obj2[key] instanceof Decimal && !isNaN(new Decimal(obj[key]).e)) {
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
		simulateTime((new Date().getTime()-JSON.parse(localStorage.getItem("growthsimofflineprogress")))/1000);
		vm.finished = true;
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