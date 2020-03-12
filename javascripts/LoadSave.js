var sP = atob(localStorage.getItem("player"));
var savePlayer = JSON.parse(sP);
if (localStorage.getItem("player") !== null) {
	Object.keys(initPlayer).forEach(function(key) {
		if (savePlayer[key] != undefined) {
			if ((savePlayer[key].m != undefined && savePlayer[key].e != undefined) || key == "timePlayed" || key == "notation" || key == "theme") {
				if (initPlayer[key] == undefined) {
					delete savePlayer.key;
					console.log("Deleted excess " + key);
					alert("Deleted excess value " + key)
				} else {
					console.log(key + "found");
				}
			} else {
				console.log(key + "invalid");
				if (key == "money") {
					savePlayer.money = new Decimal(1);
				} else {
					savePlayer[key] = new Decimal(0);
				}
				console.log("Value " + key + " fixed");
			}
		} else {
			savePlayer[key] = initPlayer[key];
		}
	});
	var values = Object.values(savePlayer);
	if (!values.includes(null) && !values.includes(NaN) && !values.includes(undefined) ) {
		player = savePlayer;
		Object.keys(player).forEach(function(key) {
			if (key != "notation" && key != "theme" && key != "timePlayed") {
				if (typeof(player[key]) == "object") {
					player[key].forEach(function (item, index) {
						player[key][index] = new Decimal(item);
					});
				} else {
					player[key] = new Decimal(player[key]);
				}
			}
		});
		update();
		for (var i = 0; i < 1000; i++) {
			player.money = player.money.add((player.hacks[0].div(1000000).mul(multi.hacks)).mul(((new Date()).getTime) - savePlayer.timePlayed));
			player.hacks[0] = player.hacks[0].add(((player.hackers[0].div(2000000).mul(multi.hackers).add(player.trainers[0].div(400000).mul(multi.trainers).add(player.masters[0].div(80000).mul(multi.masters)))).mul(((new Date).getTime) - savePlayer.timePlayed));
			player.hackers[0] = player.hackers[0].add((player.trainers[0].div(10000000).mul(multi.trainers).add(player.masters[0].div(2000000).mul(multi.masters))).mul(((new Date()).getTime) - savePlayer.timePlayed));
			player.trainers[0] = player.trainers[0].add((player.masters[0].div(25000000).mul(multi.masters)).mul(((new Date()).getTime) - savePlayer.timePlayed));
		}
		document.getElementById("away").style.display = "initial";
		document.getElementById("awayMessage").innerHTML = "While you were away, your money gained " + formatNotation(new Decimal(savePlayer.money.log10() - player.money.log10())) + " Orders of Magnitude.";
	} else {
		alert("Error: save contains invalid values. Loading terminated.");
	}
}
