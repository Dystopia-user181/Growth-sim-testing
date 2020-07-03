function fluctuate () {
	if (plantSell < 4.5) {
		plantSell += Math.pow(Math.random()/5+0.6 , Math.max(-1.15, Math.min(plantSell-5+(Math.random()-0.5)/3, 1.15)))/10;
		return;
	} else if (plantSell > 5.5) {
		plantSell -= Math.pow(Math.random()/5+0.6 , Math.max(-1.15, Math.min(5-plantSell+(Math.random()-0.5)/3, 1.15)))/10;
		return;
	}
	if (Math.random() < 0.5) {
		plantSell += Math.pow(Math.random()/5+0.6 , Math.max(-1.15, Math.min(plantSell-5+(Math.random()-0.5)/3, 1.15)))/10;
	} else {
		plantSell -= Math.pow(Math.random()/5+0.6 , Math.max(-1.15, Math.min(5-plantSell+(Math.random()-0.5)/3, 1.15)))/10;
	}
	plantSell = Math.max(4.4, Math.min(5.6, plantSell));
}
setInterval(fluctuate, 10000);