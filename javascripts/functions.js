function save () {
	localStorage.setItem('player', btoa(JSON.stringify(player)));
}
function switchTab(tab) {
	if (tab == "producer") {
		document.getElementById("main").style.display = "initial";
		document.getElementById("options").style.display = "none";
	} else if (tab == "options") {
		document.getElementById("main").style.display = "none";
		document.getElementById("options").style.display = "initial";
	}
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
			if (key != "notation" && key != "theme" && key!= "timePlayed") {
				if (typeof(player[key]) == "object") {
					player[key].forEach(function (item, index) {
						player[key][index] = new Decimal(item);
					});
				} else {
					player[key] = new Decimal(player[key]);
				}
			}
		});
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