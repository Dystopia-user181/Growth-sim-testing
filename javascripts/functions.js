let currentTab = "main";
function save () {
	localStorage.setItem('player', btoa(JSON.stringify(player)));
	console.log("Game saved.");
}
function switchTab(tab) {
	document.getElementById(currentTab).style.display = "none";
	document.getElementById(tab).style.display = "initial";
	currentTab = tab;
}
function copy() {
	let saveCopy = document.getElementById("saveCopy");
	saveCopy.style.display = "block";
	saveCopy.value = btoa(JSON.stringify(player)); 
	saveCopy.select();
	saveCopy.setSelectionRange(0, 99999);
	document.execCommand("copy");
	saveCopy.style.display = "none";
}
function pasteSave() {
	let save = prompt("Please input your save.");
	let parsedSave = JSON.parse(atob(save));
	if (typeof(parsedSave) == "object") {
		player = parsedSave;
		Object.keys(player).forEach(function(key) {
			if (key != "notation" && key != "theme" && key != "timePlayed" && key != "neon") {
				if (typeof(player[key]) == "object") {
					player[key].forEach(function (item, index) {
						player[key][index] = new Decimal(item);
					});
				} else {
					player[key] = new Decimal(player[key]);
				}
			}
		});
		simulateTime((new Date()).getTime() - parsedSave.timePlayed);
		console.log((new Date()).getTime() - parsedSave.timePlayed);
		console.log(parsedSave.timePlayed);
		console.log((new Date()).getTime());
	}
}
function simulateTime(time) {
	update();
	for (var i = 0; i < 1000; i++) {
		player.money = player.money.add(player.hacks[0].div(1000000).mul(multi.hacks).mul(player.efficiency).mul(time));
		player.hacks[0] = player.hacks[0].add(player.hackers[0].div(2000000).mul(multi.hackers).add(player.trainers[0].div(400000).mul(multi.trainers)).add(player.masters[0].div(80000).mul(multi.masters)).mul(player.efficiency).mul(time));
		player.hackers[0] = player.hackers[0].add(player.trainers[0].div(10000000).mul(multi.trainers).add(player.masters[0].div(2000000).mul(multi.masters)).mul(player.efficiency).mul(time));
		player.trainers[0] = player.trainers[0].add(player.masters[0].div(25000000).mul(multi.masters).mul(player.efficiency).mul(time));
	}
}

function hardReset() {
	let rist = prompt("Are you sure you want to reset? If so, please type \"LET ME OUTTT\" to continue.");
	if (rist == "LET ME OUTTT") {
		player = initPlayer;
	}
}
function cancelPopup() {
	document.getElementById("away").style.display = "none";
}