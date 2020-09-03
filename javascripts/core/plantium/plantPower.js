function assign(amt=1) {
	amt = new Decimal(amt);
	if (player.plantium.lt(amt)) return;
	player.plantium = player.plantium.sub(amt.floor());
	player.generators = player.generators.add(amt.floor());
}