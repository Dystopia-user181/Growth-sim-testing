function defTmpData() {return {
	plantGen() {
		return player.plants.picked.max(1).min(player.cvt.total.floor())
		.pow(upgs.qus[0].bought + 1).pow(upgs.cus[0].bought + 1)
		.mul(Decimal.pow(1.5, player.cvt.level))
		.mul(upgs.qus[3].bought ? upgs.qus[3].effect : 1)
		.mul(tmp.pre.honeyEff).mul(tmp.plantium.pPowEffect)
		.mul(upgs.pus[7].bought ? upgs.pus[7].effect : 1)
		.mul(upgs.cus[2].bought ? Decimal.pow(2, player.cvt.bought.div(400).floor()) : 1)
		.mul(upgs.cus[3].bought ? player.bees.pow(0.05) : 1).mul(upgs.hcs[0].boost);
	},
	pre: {
		honeyEff: getHoneyEffect,
	},
	plantium: {
		plantPowGen() {
			return player.generators.sub(upgs.pus[3].bought ? 0 : player.factories.div(2))
			.mul(tmp.plantium.bEffect).mul(upgs.hcs[2].boost).mul(0.1);
		},
		bEffect: [getBatteryEffect1, getBatteryEffect2],
		pPowEffect: getPPowEffect,
		box: {
			cellVals: getBatCellVals,
			batEffi: getBatEffi
		}
	}
}}
let tmpData = defTmpData();
let tmp = defTmpData();

let upgsData = {
	qus,
	cus,
	pus,
	hcs
}
let upgs = {...upgsData}

function setupTmp(tmpDataD, tmpD) {
	for (let i in tmpDataD) {
		let val = tmpDataD[i];
		if (val.constructor == Object) {
			setupTmp(tmpDataD[i], tmpD[i])
		} else if (Array.isArray(val)) {
			setupTmp(tmpDataD[i], tmpD[i])
		} else if (typeof val == "function") {
			if (i == "pPowEffect") console.log(tmpDataD[i], tmpD[i])
			tmpD[i] = D(0);
			if (i == "pPowEffect") console.log(tmpDataD[i], tmpD[i])
		}
	}
}
setupTmp(tmpData, tmp);
function updateTmp() {
	updateTmpData(upgsData, upgs, false);
	updateTmpData(tmpData, tmp, false);
}
function updateTmpData(tmpDataD, tmpD, isArr) {
	for (let i in tmpDataD) {
		let val = tmpDataD[i];
		if (val.constructor == Object) {
			updateTmpData(val, tmpD[i], false)
		} else if (Array.isArray(val)) {
			updateTmpData(val, tmpD[i], true)
		} else if (typeof val == "function") {
			if (isArr)
				Vue.set(tmpD, i, val());
			else
				tmpD[i] = val();
		}
	}
}
updateTmpData(upgsData, upgs, false);

updateTmp();