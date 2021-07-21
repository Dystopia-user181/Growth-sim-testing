function assign() {
	if (player.plantium.lt(vm.getGenScal())) return;
	player.plantium = player.plantium.sub(vm.getGenScal());
	player.generators = player.generators.add(1);
}
function assignMax(money=player.plantium.sub(1).add(1)) {
	if (money.lt(vm.getGenScal())) return;
	while (money.gte(vm.getGenScal())&&player.plantium.gte(vm.getGenScal())) {
		money = money.sub(vm.getGenScal());
		assign();
	}
}
function getPPowEffect() {
	return player.plantpow.add(1).pow(D(upgs.pus[0].bought ? 2.2 : 1.1).mul(tmp.plantium.bEffect[1]))
}
function buybattery() {
	if (player.generators.lt(Decimal.pow(2, player.batteries))) return;
	player.generators = player.generators.sub(Decimal.pow(2, player.batteries));
	player.batteries = player.batteries.add(1);
}

function getBatCellVals() {
	return player.batteryArray.map((_, i)=>{
		return _.map((k, e) => {
			switch(k.toLowerCase()) {
				case "copper":
				return D(0.2);
				break;
				case "silver":
				return D(0.1).add(0.2);
				break;
				case "connected":
				return D(player.batteryArray.reduce((a, i)=>a+=(i.reduce((b, j)=>b+= j=="copper", 0)), 0)).mul(0.04);
				break;
				case "chained":
				var a = 0;
				a += (player.batteryArray[i-1] != undefined && player.batteryArray[i-1][e] == "chained");
				a += (player.batteryArray[i][e-1] == "chained");
				a += (player.batteryArray[i+1] != undefined && player.batteryArray[i+1][e] == "chained");
				a += (player.batteryArray[i][e+1] == "chained");
				return D(a).mul(0.1);
				default:
				return D(0);
			}
		})
	})
}
function getBatEffi() {
	return tmp.plantium.box.cellVals.reduce((_, i)=> _ = _.add(i.reduce((a, b)=>a.add(b))), D(0));
}
function getBatteryEffect1() {
	return Decimal.pow(tmp.plantium.box.batEffi.add(1), player.batteries);
}
function getBatteryEffect2() {
	return D(player.batteries.mul(tmp.plantium.box.batEffi).add(7).log(7)).pow(0.35);
}
function buyCell(type) {
	if (!vm.cellUnlocks[type].unlocked || player.plantium.lt(getCellScaling(type))) return;
	player.plantium = player.plantium.sub(getCellScaling(type));
	player.batteryBox[type] = player.batteryBox[type].add(1);
}
function getCellScaling(type) {
	switch (type.toLowerCase()) {
		case "copper":
		return Decimal.pow(9, player.batteryBox[type].pow(1.4).add(player.batteryBox[type].sub(10).max(0).pow(2.4))).mul(1e9);
		break;
		case "silver":
		return Decimal.pow(12, player.batteryBox[type].pow(1.6).add(player.batteryBox[type].sub(10).max(0).pow(2.6))).mul(1e11);
		break;
		case "connected":
		return Decimal.pow(15, player.batteryBox[type].pow(1.7).add(player.batteryBox[type].sub(10).max(0).pow(2.7))).mul(1e35);
		break;
		case "chained":
		return new Decimal(1e100);
		break;
	}
}
function placeCell(row, col, type) {
	if (player.batteryBox[type].lte(player.batteryArray.reduce((_, i)=>_+=i.reduce((a, b)=>a += b==type, 0), 0))) return;
	Vue.set(player.batteryArray[row], col, type);
}
function removeCell(e, row, col) {
	Vue.set(player.batteryArray[row], col, "");
	e.preventDefault();
}
function expand() {
	if (player.plantium.lt(getExpansionCost())) return;
	player.plantium = player.plantium.sub(getExpansionCost());
	player.expansions++;
	for (var i = 0; i < player.batteryArray.length; i++) {
		player.batteryArray[i].push("");
	}
	player.batteryArray.push(player.batteryArray[0].map(_=>""));
	Vue.set(player, "batteryArray", player.batteryArray);
}
function getExpansionCost() {
	return Decimal.pow(1e100, D(player.expansions).pow(4)).mul(1e40)
}