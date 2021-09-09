function toScientific (decimal, places=0, placesafter1000=2, evalue=3) {
	decimal = new Decimal(decimal);
	let e = decimal.e, m = decimal.m
	if (m.toFixed(placesafter1000) > 10) {
		m = 1;
		e++;
	}
	if (Math.abs(e) < evalue) return (Math.floor(m*Math.pow(10, decimal.e+places)+Number.EPSILON)/Math.pow(10, places)).toFixed(places);
	else return `${m.toFixed(placesafter1000)}e${toScientific(decimal.e, 0, 4, 6)}`;
}
function toEngineering (decimal, places=0, placesafter1000=2, evalue=3) {
	decimal = new Decimal(decimal);
	let e = decimal.e, m = decimal.m
	if (m.toFixed(placesafter1000) > 10) {
		m = 1;
		e++;
	}
	if (Math.abs(e) < evalue) return (Math.floor(m*Math.pow(10, e+places))/Math.pow(10, places)).toFixed(places);
	else return `${(m*Math.pow(10, e%3)).toFixed(placesafter1000)}e${toScientific(Math.floor(e/3)*3,
	 0, 4, 6)}`;
}
function toLogarithm (decimal, places=0, placesafter1000=2, evalue=3) {
	decimal = new Decimal(decimal);
	if (Math.abs(decimal.e) < evalue) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `e${decimal.log(10).toFixed(placesafter1000+1)}`;
}
function toBinary (decimal, places=0, placesafter1000=2, evalue=3) {
	decimal = new Decimal(decimal);
	if (Math.abs(decimal.log(2)) < evalue+1) return (Number((Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toString(2))).toFixed(places); else return `${Number(Math.pow(2, (decimal.log(2)%1)).toString(2)).toFixed(placesafter1000+1)}e${decimal<0?"-":""}${toBinary(Math.floor(Decimal.abs(decimal).log(2)), 0, 2, 4)}`;
}
function toYESNO (decimal, places, a, ab) {
	decimal = new Decimal(decimal);
	return decimal.lte(0) ? "NO" : "YES";
}
function comma(num, precision=0) {
	num = D(num);
	if (num === null || num === undefined) return "NaN"
	if (num.lt(1e3)) return num.toNumber().toFixed(precision);
	return num.toNumber().toFixed(precision).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

function toNot(decimal, places=0, placesafter1000=2, evalue=3) {
	switch (player.option.notation) {
		case "Scientific":
		return toScientific(decimal, places, placesafter1000, evalue);
		break;
		case "Engineering":
		return toEngineering(decimal, places, placesafter1000, evalue);
		break;
		case "Logarithm":
		return toLogarithm(decimal, places, placesafter1000, evalue);
		break;
		case "Binary":
		return toBinary(decimal, places, placesafter1000, evalue);
		break;
		case "YESNO":
		return toYESNO(decimal, places, placesafter1000, evalue);
		break;
		case "Blind":
		return "";
		break;
	};
}