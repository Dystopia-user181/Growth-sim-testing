let notations = ["Scientific", "Engineering", "Logarithmic", "Logarithm 2", "Natural", "Cancer", "Blind"];
function formatNotation (variable, fix) {
	if (variable.e < 3 && player.notation !== "Blind") {
		if (fix) {
			return ((variable.m*Math.pow(10, variable.e)).toFixed(2));
		} else {
			return ((variable.m*Math.pow(10, variable.e)).toFixed());
		}
	} else {
		switch (player.notation) {
			case "Scientific": return (formatScientific(variable));
			case "Engineering": return (formatEngineering(variable));
			case "Logarithmic": return (formatLogarithmic(variable));
			case "Logarithm 2": return (formatLogarithm2(variable));
			case "Natural": return (formatNatural(variable));
			case "Cancer": return (formatCancer(variable));
			case "Blind": return ("");
			default: return ("NOTFOUND");
		}
	}
}
function switchNotation () {
	let index = notations.findIndex(function (n) {
		return (n == player.notation);
	});
	if (index == -1) {
		player.notation = "Scientific";
		$("notation").innerHTML = "Notation: Scientific";
	} else {
		player.notation = notations[(index+1)%notations.length];
		$("notation").innerHTML = "Notation: " + player.notation;
	}
}
let cancer = ["💦", "😡", "😭", "😱", "😂", "😍", "😞", "😈", "🙈", "🍆"];
function formatScientific (variable) {
	if (variable.m < 9.995) {
		return (variable.m.toFixed(2) + "e" + variable.e);
	} else {
		return ("1.00e" + (variable.e + 1));
	}
}
function formatEngineering (variable) {
	if (variable.m*Math.pow(10, variable.e%3) < 999.995) {
		return ((variable.m*Math.pow(10, variable.e%3)).toFixed(2) + "e" + (variable.e - variable.e%3));
	} else {
		return ("1.00e" + (variable.e + 1));
	}
}
function formatLogarithmic (variable) {
	return ("e" + variable.log10().toFixed(2));
}
function formatLogarithm2 (variable) {
		return ("e" + variable.log2().toFixed(3));
}
function formatNatural (variable) {
	return ("e" + variable.log(Math.E).toFixed(3));
}
function formatCancer (variable) {
	if (variable.m*Math.pow(10, variable.e%3) < 999.995) {
		return ((variable.m*Math.pow(10, variable.e%3)).toFixed(2) + formatCancerE(variable));
	} else {
		return ("1.00e" + formatCancerE(variable.e + 1));
	}
}
function formatCancerE (variable) {
	let returnText = "";
	let maxPow = Math.floor(new Decimal(variable.e/3).e) + 1;
	for (var i = 0; i < maxPow; i++) {
		returnText += cancer[Math.floor(Math.floor(variable.e/3)/Math.pow(10, i))%Math.pow(10, i + 1)];
	}
	return (returnText);
}