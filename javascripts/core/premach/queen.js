function queenReset() {
	if (player.bees.lt(Decimal.pow(vm.qus[2].bought?500:1e3, player.queens.amt).mul(1e5))) return;
	if (player.queens.amt.lt(5)) {
		if (!confirm("Do you want to perform a queen reset? This will reset your bees and honey and diminish bee production for 100 seconds.")) return;
	}
	player.queens.amt = player.queens.amt.add(1);
	player.bees = new Decimal(0);
	player.honey = new Decimal(0);
	player.queens.beeproduction = 0;
}
function giveHoney() {
	player.queens.honey = player.queens.honey.add(player.honey.div(2));
	player.honey = player.honey.div(2);
}