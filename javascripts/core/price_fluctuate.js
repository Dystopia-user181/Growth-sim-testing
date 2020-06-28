function fluctuate () {
	if (plantSell < 4) {
		plantSell += Math.pow(Math.random()/5+0.6 , Math.max(-1.15, Math.min(plantSell-5+(Math.random()-0.5)/3, 1.15)));
		return;
	} else if (plantSell > 6) {
		plantSell -= Math.pow(Math.random()/5+0.6 , Math.max(-1.15, Math.min(5-plantSell+(Math.random()-0.5)/3, 1.15)));
		return;
	}
	if (Math.random() < 0.5) {
		plantSell += Math.pow(Math.random()/5+0.6 , Math.max(-1.15, Math.min(plantSell-5+(Math.random()-0.5)/3, 1.15)));
	} else {
		plantSell -= Math.pow(Math.random()/5+0.6 , Math.max(-1.15, Math.min(5-plantSell+(Math.random()-0.5)/3, 1.15)));
	}
	plantSell = Math.max(3.9, Math.min(6.1, plantSell));
}
setInterval(fluctuate, 10000);