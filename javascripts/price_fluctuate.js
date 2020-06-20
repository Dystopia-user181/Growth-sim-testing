function fluctuate () {
  if (Math.random() < 0.5) {
    plantSell += Math.pow(Math.random()/3+0.5 , Math.max(-1.5, Math.min(plantSell-5+Math.random()-0.5, 1.5)));
  } else {
    plantSell -= Math.pow(Math.random()/3+0.5 , Math.max(-1.5, Math.min(5-plantSell+Math.random()-0.5, 1.5)));
  }
}
setInterval(fluctuate, 10000);