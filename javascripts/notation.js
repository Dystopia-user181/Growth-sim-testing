function toSci (decimal, places=0) {
	decimal = new Decimal(decimal);
	if (decimal.e < 3) return (Math.floor(decimal.m*Math.pow(10, decimal.e+places))/Math.pow(10, places)).toFixed(places); else return `${decimal.m.toFixed(2)}e${decimal.e.toString()}`;
}