var vdata = {
	el: "#main",
	data: {
		player: player,
		Decimal: Decimal,
		toScientific: toScientific,
		finished: false
	},
	computed: {
		beecapped: function () {return this.queenbeecap.mul(1e7).lt(player.bees);},
		pu7buff: function () {return this.pus[7].bought?player.plantium.add(1).pow(0.4):1;},
		batteryboost: function () {return Decimal.pow(this.batEffi.add(1), player.batteries)},
		batteryboost2: function() {return D(player.batteries.mul(this.batEffi).add(7).log(7)).pow(0.35)},
		plantpowps: function () {return player.generators.sub(vm.pus[3].bought?0:player.factories.div(2)).mul(this.batteryboost).mul(this.hcs[2].boost).mul(0.1);},
		pps: function () {return player.plants.picked.max(1).min(player.cvt.total.floor()).pow(this.qus[0].bought?2:1).pow(this.cus[0].bought?2:1).mul(this.qus[3].bought?Decimal.pow(3, player.queens.amt).mul(player.queens.honey.add(10).log(10)):1).mul(Decimal.pow(1.5, player.cvt.level)).mul(this.hcvtboost).mul(this.plantpowbuff).mul(this.pu7buff).mul(this.cus[2].bought?Decimal.pow(2, player.cvt.bought.div(400).floor()):1).mul(this.cus[3].bought?player.bees.pow(0.05):1).mul(this.hcs[0].boost);},
		plantpowbuff: function () {return player.plantpow.add(1).pow(D(this.pus[0].bought?2.2:1.1).mul(this.batteryboost2));},
		hcvtboost: function () {return player.honey.add(1).pow(0.3);},
		hps: function () {return player.bees.min(player.plants.field).pow(0.5).mul(player.honeycombs.pow(0.3).add(1).mul(this.plantpowbuff));},
		qulimit: function () {return Decimal.pow(10000, this.qus[1].bought?1.5:1)},
		space: function () {return player.hives.bought.div(300).floor();},
		spaceRem: function() {return this.space.sub(player.combstructures[0].add(player.combstructures[1]).add(player.combstructures[2]).add(player.combstructures[3]).add(player.combstructures[4]))},
		comps: function () {return player.hives.total.floor().pow(this.qus[0].bought?2:1).mul(this.plantpowbuff).mul(Decimal.pow(1.5, player.hives.level)).mul(Decimal.pow(player.queens.honey.div(player.queens.amt).max(0).min(this.qulimit).add(10).log(10), player.queens.amt)).mul(this.pu7buff).mul(this.cus[2].bought?Decimal.pow(2, player.hives.bought.div(400).floor()):1).mul(this.cus[3].bought?player.bees.pow(0.1):1).mul(this.hcs[1].boost);},
		queenbeecap: function () {return player.queens.honey.div(player.queens.amt).max(0).min(this.qulimit).add(1).pow(0.5).pow(player.queens.amt);},
		tabbtns: function () {
			return [
				{id: 1, req: true, tab: "Plants", onclick: `player.navigation.tab = "Plants"`},
				{id: 2, req: true, tab: player.tutorial.unlockedMachine?"Machine":"Locked (Requires $" + toNot(1e14) + ")", onclick: player.tutorial.unlockedMachine?`player.navigation.tab = "Machine"`:""},
				{id: 2.5, req: this.pus[4].bought, tab: "Automation", onclick: `player.navigation.tab = "Automation"`},
				{id: 3, req: player.tutorial.unlockedMachine, tab: player.tutorial.madeFirstPlantium?"Plantium":"Locked (Requires having used the machine at least once)", onclick: player.tutorial.madeFirstPlantium?`player.navigation.tab = "Plantium"`:""},
				{id: 4, req: true, tab: "Options", onclick: `player.navigation.tab = "Options"`}
			];
		},
		options: function () {
			return {
				row1: [
					{id: 5, text: "Save", onclick: "save()"},
					{id: 6, text: "Load", onclick: "load(JSON.parse(localStorage.getItem('growthsimsave'))); vm.player = player; vm.$forceUpdate()"},
					{id: 7, text: `Autosave: ${getnff(this.player.option.autosave)}`, onclick: "player.option.autosave = !player.option.autosave;"},
				],
				row2: [
					{id: 8, text: "Export", onclick: "expo()"},
					{id: 9, text: "Import", onclick: "impo()"},
					{id: 10, text: "Hard Reset", onclick: "reset()"}
				],
				row3: [
					{id: 11, text: `Notation`, el: ["Scientific", "Engineering", "Logarithm", "Binary", "YESNO", "Blind"], it: "notation"},
					{id: 12, text: `Theme`, el: ["Dark", "Light", "Inverted Light", "Metro", "Tilt", "Purple"], it: "theme"},
				]
			}
		},
		qus,
		cus,
		pus,
		hcs,
		cellDesc: function() {
			return {
				copper: "Add 0.2 to battery efficiency.",
				silver: "Add 0.3 to battery efficiency.",
				connected: "Add 0.04 to battery efficiency for every copper cell.",
				chained: "Add 0.1 to battery efficiency (this is then multiplied by the number of neighbours.)"
			}
		},
		cellUnlocks: function() {
			return {
				copper: {
					unlocked: true
				},
				silver: {
					unlocked: player.batteryUnlocks > 0,
					desc: `Reach ${toNot(6)} batteries to unlock.`
				},
				connected: {
					unlocked: player.batteryUnlocks > 1,
					desc: `Reach ${toNot(2.222e222)} bees to unlock.`
				},
				chained: {
					unlocked: player.cellUnlocks > 2,
					desc: "Wait for the next update to unlock."
				}
			}
		},
		cellVals: function() {
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
						a += (player.batteryArray[i-1]!=undefined&&player.batteryArray[i-1][e]=="chained");
						a += (player.batteryArray[i][e-1]=="chained");
						a += (player.batteryArray[i+1]!=undefined&&player.batteryArray[i+1][e]=="chained");
						a += (player.batteryArray[i][e+1]=="chained");
						return D(a).mul(0.1);
						default:
						return D(0);
					}
				})
			})
		},
		batEffi: function() {
			return this.cellVals.reduce((_, i)=> _ = _.add(i.reduce((a, b)=>a.add(b))), D(0));
		}
	},
	methods: {
		toNot,
		getCvtScal,
		getCvtUpScal,
		getFacScal: function () {
			return player.factories.lt(30) ? getNScal(10, player.factories, 1e4) : getNScal(50, player.factories.sub(30).mul(Decimal.pow(1.5, player.factories.sub(100))), 1e34);
		},
		getGenScal: function () {
			return Decimal.pow(2, player.generators.sub(1).max(0).add(player.generators.sub(50).max(0).pow(1.25).mul(0.5)));
		},
		getNSca: function (scal, num, normal) {
			return this.toNot(this.getNScal(scal, num, normal), 2);
		},
		getNScal: function (scal, num, normal=1) {
			return Decimal.pow(scal, num).mul(normal);
		},
		getnff: function (bool) {
			if (bool) return "ON"; else return "OFF";
		},
		btoa: function (a) {return btoa(a)},
		save,
		load,
		expo,
		impo,
		reset,
		buyCvtUpgrade,
		buyQueenUpgrade,
		buyHC,
		buyPlantiumUpgrade,
		buyCell,
		getCellScaling,
		placeCell,
		removeCell,
		expand,
		getExpansionCost,
		D,
		comma
	}
};
Vue.component("tabbtn", {
	props: {
		obj: Object
	},
	template: `<button v-if="obj.req" :onclick="obj.onclick">{{obj.tab}}</button>`
});
Vue.component("optionsbtn", {
	props: {
		text: String
	},
	template: `<button class="optionsbtn">{{text}}</button>`
});
Vue.component("tbtn", {
	props: {
		text: String,
		it: String,
		el: Array
	},
	template: `<button class="optionsbtn">{{text}}: <select v-model=player.option[it]><option v-for="els in el">{{els}}</option></select></button>`,
	data: () => {
		return {player}
	}
});
Vue.component("qubtn", {
	props: {
		obj: Object
	},
	template: `<button :class="'qu ' + (obj.bought?'b':(player.queens.amt.gte(obj.cost)?'u':'d'))" v-on:click="buyQueenUpgrade(obj)" :disabled="player.queens.amt.lt(obj.cost) && !obj.bought" v-if="obj.id<4||pus[9].bought">{{obj.desc}}<br>Cost: {{toNot(obj.cost)}} Queens</button>`,
	data: () => {
		return {player}
	},
	methods: vdata.methods,
	computed: vdata.computed
});
Vue.component("cubtn", {
	props: {
		obj: Object
	},
	template: `<button :class="'cu ' + (obj.bought?'b':((player.cvt.bought.gte(obj.cost)&&player.hives.bought.gte(obj.cost))?'u':'d'))" v-on:click="buyCvtUpgrade(obj)" :disabled="player.cvt.bought.lt(obj.cost)&&player.hives.bought.lt(obj.cost) && !obj.bought">{{obj.desc}}<br>Cost: {{comma(obj.cost)}} Bought Cultivators and Hives</button>`,
	data: () => {
		return {player}
	},
	methods: vdata.methods,
	computed: vdata.computed
});
Vue.component("pubtn", {
	props: {
		obj: Object
	},
	template: `<button :class="'pu ' + (obj.bought?'b':(player.plantium.gte(obj.cost)?'u':'d'))" v-on:click="
	buyPlantiumUpgrade(obj)" :disabled="player.plantium.lt(obj.cost) && !obj.bought"><b>{{obj.title}}</b><br>{{obj.desc}}<span v-if="obj.effect"><br>Currently: {{obj.effect}}</span><br>Cost: {{toNot(obj.cost)}} Plantium</button>`,
	data: () => {
		return {player}
	},
	methods: vdata.methods,
	computed: vdata.computed
});
Vue.component("hcbtn", {
	props: {
		obj: Object
	},
	template: `<button class="hc" v-if="qus[5].bought" v-on:click="buyHC(obj)" :disabled="player.honeycombs.lt(obj.cost) || spaceRem.lte(0)"><b>Structure {{toNot(obj.id+1)}}</b><br>Amount: {{toNot(obj.amt)}}<br>{{obj.desc}}<br>Currently: {{obj.effect()}}<br>Cost: {{toNot(obj.cost)}} Honeycombs</button>`,
	data: () => {
		return {player}
	},
	methods: vdata.methods,
	computed: vdata.computed
});

Vue.component("battery-box", {
	template:`<div v-if="pus[8].bought">
	<br>
	Total battery efficiency: {{toNot(batEffi, 2)}}
	<br><br>
	Click to place, right click to remove.
	<br><br>
		<battery-array></battery-array>
		<br><br>
		<span v-if="player.infoBatCell">{{player.infoBatCell[0].toUpperCase()+player.infoBatCell.substr(1)}} cell ({{cellDesc[player.infoBatCell]}})</span>
		<br><br>
		<div v-if="player.batteryUnlocks > 1">Array size: {{player.expansions+4}}x{{player.expansions+4}}
		<br>
		<button v-on:click="expand()" :disabled="player.plantium.lt(getExpansionCost())">Expand array size by 1. Cost: {{toNot(getExpansionCost())}} plantium</button></div>
		<br><br>
		<div style="display: flex; justify-content: center"><battery-buttons v-for="(obj, type) in cellUnlocks" :obj="obj" :type="type"></battery-buttons></div>
	</div>`,
	data: () => {
		return {player}
	},
	methods: vdata.methods,
	computed: vdata.computed
});
Vue.component("battery-array", {
	template:`<div class="array">
	<span>The Battery Box</span>
	<battery-row v-for="(row, index) in player.batteryArray" :row="row" :index="index"></battery-row>
	</div>`,
	data: () => {
		return {player}
	},
	methods: vdata.methods,
	computed: vdata.computed
});
Vue.component("battery-row", {
	props: {
		row: Array,
		index: Number
	},
	template: `<div><battery-cell v-for="(cell, col) in row" :row="index" :cell="cell" :col="col"></battery-cell></div>`
});
Vue.component("battery-cell", {
	props: {
		cell: String,
		row: Number,
		col: Number
	},
	template: `<button :class="cell" v-on:click="placeCell(row, col, player.selectedBatteryCell)" @contextmenu="removeCell($event, row, col)">{{toNot(cellVals[row][col], 2)}}</button>`,
	data: () => {
		return {player, Vue}
	},
	methods: vdata.methods,
	computed: vdata.computed
});
Vue.component("battery-buttons", {
	props: ["obj", "type"],
	template: `<div class="batteryButton" :id="type" v-if="obj!=undefined">
		<div v-if="obj.unlocked">
			<button :class="{
				batterybtn: true,
				[type]: true,
				selected: player.selectedBatteryCell==type,
				disabled: player.batteryBox[type].lte(player.batteryArray.reduce((_, i)=>_+=i.reduce((a, b)=>a += b==type, 0), 0))
			}"

			v-on:click="player.selectedBatteryCell=type"
			@mouseover="player.infoBatCell=type">
			{{toNot(player.batteryBox[type].sub(player.batteryArray.reduce((_, i)=>_+=i.reduce((a, b)=>a += b==type, 0), 0)))}}
			</button>
			<br><br>
			<button v-on:click="buyCell(type)" :disabled="player.plantium.lt(getCellScaling(type))">Buy 1
			<br>
			(Cost: {{toNot(getCellScaling(type))}} plantium)</button>
		</div>
		<div v-else-if="cellUnlocks[type]!=undefined" style="position: relative; border: 2px solid #fff; width: 100%; height: 100%;">
			<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">{{obj.desc}}</span>
		</div>
	</div>`,
	data: () => {
		return {player, Decimal}
	},
	methods: vdata.methods,
	computed: vdata.computed
})
var vm = new Vue(vdata);