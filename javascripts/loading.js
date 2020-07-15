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
```js- wait I'm not in discord
qwertyuiopasdfghjklzxcvbnm
mnbvcxzlkjhgfdsapoiuytrewq
qazwsxedcrfvtgbyhnujmikolp
plmoknijbuhvygctfxrdzeswaq
B
*/
function load(save) {
	if (save.version !== "0.0.0.4") return "Save Too Old, balancing incorrect";
	if (typeof save !== "object") return;
	if (save === null) return;
	Object.keys(initPlayer).forEach(function (key, index) {
		if (save[key] === undefined) {
			save[key] = initPlayer[key];
		} else if (typeof save[key] === "string" && typeof initPlayer[key] === "object") {
			save[key] = new Decimal(save[key]);
		} else if (typeof initPlayer[key] === "object" && typeof save[key] === "object") {
			Object.keys(initPlayer).forEach(function (key2, index2) {
				if (save[key] === undefined) {
					save[key] = initPlayer[key];
				} else if (typeof save[key][key2] === "string" && typeof initPlayer[key][key2] === "object") {
					save[key][key2] = new Decimal(save[key][key2]);
				} else if (typeof save[key] != typeof initPlayer[key]) {
					save[key][key2] = initPlayer[key][key2];
				}
			});
		} else if (typeof save[key] != typeof initPlayer[key]) {
			save[key] = initPlayer[key];
		}
	});
	player = save;
	$("plantinput").value = player.automator.sellPlant*100;
	$("honeyinput").value = player.automator.sellHoney*100;
	$("buycontainer").innerText = getnff(player.automator.buycontainer);
	$("buycontainerup").innerText = getnff(player.automator.buycontainerup);
	$("buymarketing").innerText = getnff(player.automator.buymarketing);
	(player.option.invert) ? $("html").style.filter="invert(1)" : $("html").style.filter="invert(0)";
	$("autosave?").innerText=`Autosave: ${getnff(player.option.autosave)}`;
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