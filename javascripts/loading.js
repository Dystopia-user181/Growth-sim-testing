/*
throw (truck)
try 
catch (truck)

//Output: Failed to catch (truck): Too heavy

Something something Python 🐍
0.1+0.2 ahhhhhhh
php bad lollolol funny
Why is css
Redfire has AD clone
"Hello world";
Why doesn't this code have "use strict";?
oh good idea*/
"use strict";
/*
```js- wait I'm not in discord
qwertyuiopasdfghjklzxcvbnm
mnbvcxzlkjhgfdsapoiuytrewq
qazwsxedcrfvtgbyhnujmikolp
plmoknijbuhvygctfxrdzeswaq
B
*/
function load(save) {
	if (typeof save !== "object") return;
	if (save === null) return;
	if (save.version !== "0.0.0.5") {
		alert("Save is from an older version and thus is incompatible with the newer version.");
		player = initPlayer;
		return;
	}
	player = runParse(save, initPlayer);
	$("plantinput").value = player.automator.sellPlant*100;
	$("honeyinput").value = player.automator.sellHoney*100;
	$("buycontainer").innerText = getnff(player.automator.buycontainer);
	$("buycontainerup").innerText = getnff(player.automator.buycontainerup);
	$("buymarketing").innerText = getnff(player.automator.buymarketing);
	(player.option.invert) ? $("html").style.filter="invert(1)" : $("html").style.filter="invert(0)";
	$("autosave?").innerText=`Autosave: ${getnff(player.option.autosave)}`;
	if (player.plantiumprocess) {
		$("pbar1").style.transition = "all 20s linear";
		setTimeout(function () {
			$("pbar1").style.width = "100%";
		});
		setTimeout(function () {
			prestige(["plantium", "machine", "tutorial", "option", "version"]);
			player.plantium = player.plantium.add(1);
			player.plantiumprocess = false;
			$("pbar1").style.transition = "";
			$("pbar1").style.width = "2%";
		}, 20100);
	}
}
function runParse(obj, obj2) {
	Object.keys(obj2).forEach(function (key, index) {
		if (key != "proto") {
			if (obj[key] === undefined) {
				obj[key] = obj2[key];
			} else if (typeof obj[key] === "string" && typeof obj2[key] === "object") {
				obj[key] = new Decimal(obj[key]);
			} else if (typeof initPlayer[key] === "object" && typeof obj[key] === "object") {
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
	sv.innerText = btoa(JSON.stringify(player));
	sv.focus();
	sv.select();
	document.execCommand('copy');
	sv.style.display = "none";
}
function impo() {
	load(JSON.parse(atob(prompt("Paste your save here."))));
}