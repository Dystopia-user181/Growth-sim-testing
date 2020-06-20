function toSci (decimal, places) {
	decimal = new Decimal(decimal);
	if (decimal.lt(1000)) {
		return (decimal.m*Math.pow(10, decimal.e)).toFixed(places);
	} else {
		return `${decimal.m.toFixed(2)}e${decimal.e.toString()}`;
	}
}