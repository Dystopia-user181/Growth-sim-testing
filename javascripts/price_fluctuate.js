function fluctuate () {
	if (plantSell < 3.6) {
		plantSell += Math.pow(Math.random()/5+0.6 , Math.max(-1.2, Math.min(plantSell-5+(Math.random()-0.5)/3, 1.2)));
		return;
	} else if (plantSell > 6.4) {
		plantSell -= Math.pow(Math.random()/5+0.6 , Math.max(-1.2, Math.min(5-plantSell+(Math.random()-0.5)/3, 1.2)));
		return;
	}
	if (Math.random() < 0.5) {
		plantSell += Math.pow(Math.random()/5+0.6 , Math.max(-1.2, Math.min(plantSell-5+(Math.random()-0.5)/3, 1.2)));
	} else {
		plantSell -= Math.pow(Math.random()/5+0.6 , Math.max(-1.2, Math.min(5-plantSell+(Math.random()-0.5)/3, 1.2)));
	}
	plantSell = Math.max(3.5, Math.min(6.5, plantSell));
}
setInterval(fluctuate, 10000);