if (localStorage.getItem("growthsimsave") === null) throw "Save Not found.";
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
*/
var parsedSave = JSON.parse(localStorage.getItem("growthsimsave"));
if (parsedSave.version !== "0.0.0.3") throw "Save Too Old, balancing incorrect";
Object.keys(initPlayer).forEach(function (key, index) {
	if (parsedSave[key] === undefined) {
		parsedSave[key] = initPlayer[key];
	} else if (typeof parsedSave[key] === "string" && typeof initPlayer[key] === "object") {
		parsedSave[key] = new Decimal(parsedSave[key]);
	} else if (typeof initPlayer[key] === "object" && typeof parsedSave[key] === "object") {
		Object.keys(initPlayer).forEach(function (key2, index2) {
			if (parsedSave[key] === undefined) {
				parsedSave[key] = initPlayer[key];
			} else if (typeof parsedSave[key][key2] === "string" && typeof initPlayer[key][key2] === "object") {
				parsedSave[key][key2] = new Decimal(parsedSave[key][key2]);
			}
		});
	} else if (typeof parsedSave[key] != typeof initPlayer[key]) {
		parsedSave[key] = initPlayer[key];
	}
});
player = parsedSave;