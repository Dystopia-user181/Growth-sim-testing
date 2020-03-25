var sP = atob(localStorage.getItem("player"));
var savePlayer = JSON.parse(sP);
if (localStorage.getItem("player") !== null) {
	Object.keys(initPlayer).forEach(function(key) {
		if (savePlayer[key] != undefined) {
			if (initPlayer[key] != undefined) {
				if (typeof(savePlayer[key]) == "object" && typeof(JSON.parse(JSON.stringify(initPlayer))[key]) == "object") {
					Object.keys(savePlayer[key]).forEach(function (key2) {
						if (typeof(savePlayer[key][key2]) != typeof(JSON.parse(JSON.stringify(initPlayer))[key][key2])) {
							console.log(key + "." + key2 + " invalid");
							savePlayer[key][key2] = JSON.parse(JSON.stringify(initPlayer[key][key2]);
							console.log("Value " + key + "." + key2 + " fixed");
							alert(key + "." + key2 + " invalid; Fixed");
						} else {
							console.log(key + "." + key2 + " found");
						}
					})
				} else {
					if (typeof(savePlayer[key]) == typeof(JSON.parse(JSON.stringify(initPlayer))[key])) {
						console.log(key + " found");
					} else {
						console.log(key + " invalid");
						savePlayer[key] = JSON.parse(JSON.stringify(initPlayer))[key];
						console.log("Value " + key + " invalid; Fixed");
					}
				}
			} else {
				delete savePlayer.key;
				console.log("Deleted excess " + key);
				alert("Deleted excess value " + key);
			}
		} else {
			savePlayer[key] = initPlayer[key];
		}
	});
	var values = Object.values(savePlayer);
	if (!values.includes(null) && !values.includes(NaN) && !values.includes(undefined) ) {
		player = savePlayer;
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
		simulateTime((new Date).getTime() - savePlayer.timePlayed);
		document.getElementById("away").style.display = "initial";
		document.getElementById("awayMessage").innerHTML = "While you were away, your money gained " + formatNotation(new Decimal(savePlayer.money.log10() - player.money.log10())) + " Orders of Magnitude.";
	} else {
		alert("Error: save contains invalid values. Loading terminated.");
	}
}