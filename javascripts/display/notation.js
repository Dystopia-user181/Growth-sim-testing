function toScientific (decimal, places=0, placesafter1000=2, evalue=3) {
	decimal = new Decimal(decimal);
	if (Math.abs(decimal.e) < evalue) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `${Math.min(decimal.m, 9.99).toFixed(placesafter1000)}e${toScientific(decimal.e, 0, 4, 6)}`;
}
function toEngineering (decimal, places=0, placesafter1000=2, evalue=3) {
	decimal = new Decimal(decimal);
	if (Math.abs(decimal.e) < evalue) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `${Math.min(decimal.m*Math.pow(10, decimal.e%3), 999.99).toFixed(placesafter1000)}e${toScientific(Math.floor(decimal.e/3)*3, 0, 4, 6)}`;
}
function toLogarithm (decimal, places=0, placesafter1000=2, evalue=3) {
	decimal = new Decimal(decimal);
	if (Math.abs(decimal.e) < evalue) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `e${decimal.log(10).toFixed(placesafter1000+1)}`;
}
function toBinary (decimal, places=0, placesafter1000=2, evalue=3) {
	decimal = new Decimal(decimal);
	if (Math.abs(decimal.log(2)) < evalue+1) return (Number((Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toString(2))).toFixed(places); else return `${Number(Math.pow(2, (decimal.log(2)%1)).toString(2)).toFixed(placesafter1000+1)}e${decimal<0?"-":""}${toBinary(Math.floor(Decimal.abs(decimal).log(2)), 0, 2, 4)}`;
}
function toYESNO (decimal, places) {
	decimal = new Decimal(decimal);
	return decimal.lte(0) ? "NO" : "YES";
}