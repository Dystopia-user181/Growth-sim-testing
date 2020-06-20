if (localStorage.getItem("growthsimsave") === null) throw "Save Not found.";
/*
throw (truck)
try 
catch (truck)

//Output: Failed to catch (truck): Too heavy


0.1+0.2 ahhhhhhh

php bad lollolol funny
*/
var parsedSave = JSON.parse(localStorage.getItem("growthsimsave"));
Object.keys(initPlayer).forEach(function (key, index) {
	if (parsedSave[key] === undefined) {
		parsedSave[key] = initPlayer[key];
	} else if (typeof parsedSave[key] === "string" && typeof initPlayer[key] === "object") {
		parsedSave[key] = new Decimal(parsedSave[key]);
	} else if (typeof initPlayer[key] === "Object" && typeof parsedSave[key] === "object") {
		Object.keys(initPlayer).forEach(function (key2, index2) {
			if (parsedSave[key] === undefined) {
				parsedSave[key] = initPlayer[key];
			} else if (typeof parsedSave[key][key2] === "string" && typeof initPlayer[key][key2] === "object") {
				parsedSave[key][key2] = new Decimal(parsedSave[key][key2]);
			}
		});
	}
});
player = parsedSave;