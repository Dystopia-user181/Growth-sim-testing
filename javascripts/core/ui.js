/*function updateUI() {
	$("hives").innerText = toSci(player.hives.total.floor());
	if (player.hives.bought.lte(200)) {
		$("hiveprice").innerText = toSci(player.hives.bought.mul(5).add(20), 2);
	} else {
		$("hiveprice").innerText = toSci(Decimal.pow(1.01, player.hives.bought.sub(200)).mul(1000), 2);
	}
	$("upcvtprice").innerText = toSci(Decimal.pow(2e3, player.cvt.level).mul(2e3), 2);
	$("honeycombamt").innerText = toSci(player.honeycombs);
	$("honeycombpersec").innerText = toSci(player.hives.total.floor().pow(2).mul(player.plantpow.add(1).pow(1.1)));
	$("combeffect").innerText = toSci(player.honeycombs.pow(0.3).add(1), 2);
	$("marketingLevel").innerText = toSci(player.marketing);
	$("marketingPrice").innerText = toSci(Decimal.pow(1e4, player.marketing).mul(1e3), 2);
	$("generatoramt").innerText = toSci(player.generators);
	$("plantpow").innerText = toSci(player.plantpow, 1);
	$("plantpowpersec").innerText = toSci(player.generators.mul(0.1), 1);
	$("plantpowboost").innerText = toSci(player.plantpow.add(1).pow(1.1), 2);
	$("factoryamt").innerText = toSci(player.factories);
	$("cvtpersec").innerText = toSci(player.factories.mul(0.2), 1);
	$("hivepersec").innerText = toSci(player.factories.mul(0.1), 1);
	$("factoryprice").innerText = toSci(Decimal.pow(2, player.factories).mul(1e4));
	$("tbuPots").style.display = getDisplay((!player.tutorial.unlockedPot) && (player.tutorial.unlockedSell));
	$("tbuAuto").style.display = getDisplay((!player.tutorial.unlockedMarketing) && (player.tutorial.unlockedSell));
	$("Pots").style.display = getDisplay(player.tutorial.unlockedPot);
	$("Hives").style.display = getDisplay(player.tutorial.unlockedPot && player.tutorial.unlockedHoneybee);
	$("Plants2").style.display = getDisplay(player.tutorial.unlockedMarketing);
	$("buyAutomatorSellPlant").style.display = getDisplay(!player.automatorUnlocked.sellPlant);
	$("plantAuto").style.display = getDisplay(player.automatorUnlocked.sellPlant);
	$("buyAutomatorSellHoney").style.display = getDisplay(!player.automatorUnlocked.sellHoney);
	$("honeyAuto").style.display = getDisplay(player.automatorUnlocked.sellHoney);
	$("autobuydiv").style.display = getDisplay(player.automatorUnlocked.buycontainer || player.automatorUnlocked.buycontainerup || player.automatorUnlocked.buymarketing);
	$("buyAutomatorSellCvt").style.display = getDisplay(!player.automatorUnlocked.buycontainer);
	$("cvtautospan").style.display = getDisplay(player.automatorUnlocked.buycontainer);
	$("buyAutomatorSellCvtup").style.display = getDisplay(!player.automatorUnlocked.buycontainerup);
	$("cvtautoupspan").style.display = getDisplay(player.automatorUnlocked.buycontainerup);
	$("buyAutomatorSellMark").style.display = getDisplay(!player.automatorUnlocked.buymarketing);
	$("markautospan").style.display = getDisplay(player.automatorUnlocked.buymarketing);
	$("machinetabbtn").style.display = getInlineDisplay(player.tutorial.unlockedMachine);
	$("mach1").style.display = getDisplay(player.machine > 0);
	$("buyMach1").style.display = getDisplay(player.machine <= 0);
	$("machinelore").style.display = getDisplay(player.plantium.gt(0) && player.display.lore);
	$("collapseExpand").style.display = getInlineDisplay(player.plantium.gt(0));
	$("plantiumtabbtn").style.display = getInlineDisplay(player.tutorial.madeFirstPlantium);
	$("factoriesdiv").style.display = getDisplay(player.tutorial.madeFirstPlantium);
	$("hrDisplayOnPlantium").style.visibility = getVisibility(player.tutorial.madeFirstPlantium);
	player.version = "0.0.0.6";
	tabTo(player.navigation.tab);
}*/
function getDisplay (bool) {
	return (bool ? "block" : "none");
}
function getInlineDisplay (bool) {
	return (bool ? "inline-block" : "none");
}
function getVisibility (bool) {
	return (bool ? "visible" : "hidden");
}
/*setInterval(updateUI, 50);*/
function invert() {
	player.option.invert = !player.option.invert;
	$("theme").setAttribute("href", `themes/${(player.option.invert) ? "Light" : "Dark"}.css`);
}
var vues = new Vue({
	el: "#mainGame",
	data: {
		player: player
	},
	computed: {
		price: () => {return Decimal.pow(1.5, player.marketing)},
		cvts: () => {return player.cvt.total.floor()},
		cvtlevel: () => {return player.cvt.level},
		cvtlevelprice: () => {return Decimal.pow(2e3, player.cvt.level.add(1))},
		bees: () => {return player.bees},
		honeyps: () => {return player.bees.min(player.plants.field).pow(0.5).mul(player.honeycombs.pow(0.3).add(1)).mul(player.plantpow.add(1).pow(1.1))},
		honey: () => {return player.honey},
		honeyboost: () => {return player.honey.add(1).pow(0.2)}
	},
	methods: {
		toSci: (decimal, places=0) => {
			decimal = new Decimal(decimal);
			if (decimal.e < 3) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `${decimal.m.toFixed(2)}e${decimal.e.toString()}`;
		},
		getCvtScal: (obj) => {
			return toSci(obj.bought.lte(200) ? 
				obj.bought.mul(5).add(20) : 
				Decimal.pow(1.01, obj.bought.sub(200)).mul(1000), 2);
		}
	}
})