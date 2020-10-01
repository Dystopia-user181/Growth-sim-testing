const notations = ["Scientific", "Engineering", "Logarithm", "Binary", "YESNO", "Blind"];
function notation () {
	if (notations.indexOf(player.option.notation)+1 >= 6) {
		player.option.notation = "Scientific";
		return;
	}
	player.option.notation = notations[notations.indexOf(player.option.notation)+1];
}
function toScientific (decimal, places=0) {
	decimal = new Decimal(decimal);
	if (decimal.e < 3) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `${Math.min(decimal.m, 9.99).toFixed(2)}e${decimal.e.toString()}`;
}
function toEngineering (decimal, places=0) {
	decimal = new Decimal(decimal);
	if (decimal.e < 3) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `${Math.min(decimal.m*Math.pow(10, decimal.e%3), 999.99).toFixed(2)}e${Math.floor(decimal.e/3)*3}`;
}
function toLogarithm (decimal, places=0) {
	decimal = new Decimal(decimal);
	if (decimal.e < 3) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `e${decimal.log(10).toFixed(3)}`;
}
function toBinary (decimal, places=0) {
	decimal = new Decimal(decimal);
	if (decimal.log(2) < 5) return (Number((Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toString(2))).toFixed(places); else return `${Number(Math.pow(2, (decimal.log(2)%1)).toString(2)).toFixed(3)}e${Math.floor(decimal.log(2)).toString(2)}`;
}
function toYESNO (decimal, places) {
	decimal = new Decimal(decimal);
	return decimal.lte(0) ? "NO" : "YES";
}