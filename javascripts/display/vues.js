var toNot = (decimal, places=0, placesafter1000=2, evalue=3) => {
	switch (player.option.notation) {
		case "Scientific":
		return toScientific(decimal, places, placesafter1000, evalue);
		break;
		case "Engineering":
		return toEngineering(decimal, places, placesafter1000, evalue);
		break;
		case "Logarithm":
		return toLogarithm(decimal, places, placesafter1000, evalue);
		break;
		case "Binary":
		return toBinary(decimal, places, placesafter1000, evalue);
		break;
		case "YESNO":
		return toYESNO(decimal, places, placesafter1000, evalue);
		break;
		case "Blind":
		return "";
		break;
	};
}
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
		pu7buff: function () {return this.pus[7].bought?Decimal.pow(1.5, player.plantium.log10()):1;},
		batteryboost: function () {return Decimal.pow(4, player.batteries)},
		plantpowps: function () {return player.generators.sub(vm.pus[3].bought?0:player.factories.div(2)).mul(this.batteryboost).mul(0.1);},
		pps: function () {return player.plants.picked.max(1).min(player.cvt.total.floor()).pow(this.qus[0].bought?2:1).pow(this.pus[0].bought?2:1).mul(this.qus[3].bought?Decimal.pow(3, player.queens.amt).mul(player.queens.honey.add(10).log(10)):1).mul(Decimal.pow(1.5, player.cvt.level)).mul(this.hcvtboost).mul(this.plantpowbuff).mul(this.pu7buff).mul(this.cus[2].bought?Decimal.pow(2, player.cvt.bought.div(200).floor()):1).mul(this.cus[3].bought?player.bees.pow(0.1):1);},
		plantpowbuff: function () {return player.plantpow.add(1).pow(this.pus[0].bought?2.2:1.1);},
		hcvtboost: function () {return player.honey.add(1).pow(0.3);},
		hps: function () {return player.bees.min(player.plants.field).pow(0.5).mul(player.honeycombs.pow(0.3).add(1).mul(this.plantpowbuff));},
		qulimit: function () {return Decimal.pow(10000, this.qus[1].bought?1.5:1)},
		space: function () {return player.hives.bought.div(200).floor();},
		comps: function () {return player.hives.total.floor().pow(this.qus[0].bought?2:1).mul(this.plantpowbuff).mul(Decimal.pow(1.5, player.hives.level)).mul(Decimal.pow(player.queens.honey.div(player.queens.amt).max(0).min(this.qulimit).add(10).log(10), player.queens.amt)).mul(this.pu7buff).mul(this.cus[2].bought?Decimal.pow(2, player.hives.bought.div(200).floor()):1).mul(this.cus[3].bought?player.bees.pow(0.1):1);},
		queenbeecap: function () {return player.queens.honey.div(player.queens.amt).max(0).min(this.qulimit).add(1).pow(0.5).pow(player.queens.amt);},
		tabbtns: function () {
			return [
				{id: 1, req: true, tab: "Plants", onclick: `player.navigation.tab = "Plants"`},
				{id: 2, req: player.tutorial.unlockedMachine, tab: "Machine", onclick: `player.navigation.tab = "Machine"`},
				{id: 2.5, req: this.pus[4].bought, tab: "Automation", onclick: `player.navigation.tab = "Automation"`},
				{id: 3, req: player.tutorial.madeFirstPlantium, tab: "Plantium", onclick: `player.navigation.tab = "Plantium"`},
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
					{id: 12, text: `Theme`, el: ["Dark", "Light", "Inverted Light", "Metro", "Tilt", "Cancer(BEWARE)"], it: "theme"},
					{id: 13, text: `Font`, el: ["Monospace", "Serif", "Sans", "Iosevka"], it: "font"}
				]
			}
		},
		qus: function () {
			return [
				{
					desc: "Cultivator and hives base production ^2.",
					cost: new Decimal(2),
					id: 0,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-1] == "1"
				},
				{
					desc: "Queen honey effect cap is ^1.5.",
					cost: new Decimal(3),
					id: 1,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-2] == "1"
				},
				{
					desc: "Queen scaling is reduced by 50%.",
					cost: new Decimal(4),
					id: 2,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-3] == "1"
				},
				{
					desc: "Cultivator production is boosted by Queens and Queen honey.",
					cost: new Decimal(5),
					id: 3,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-4] == "1"
				},
				{
					desc: "Queens no longer reset anything.",
					cost: new Decimal(40),
					id: 4,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-5] == "1"
				},
				{
					desc: "Unlock honeycomb structures.",
					cost: new Decimal(45),
					id: 5,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-6] == "1"
				},
				{
					desc: "Queens directly boost bee production.",
					cost: new Decimal(50),
					id: 6,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-7] == "1"
				},
				{
					desc: "Humans are irrelevant...",
					cost: new Decimal(5000),
					id: 7,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-8] == "1"
				},
			]
		},
		cus: function () {
			return [
				{
					desc: "Base Cultivator production is squared again.",
					cost: new Decimal(5e3),
					id: 0,
					bought: player.cvtupgrades.toString(2)[player.cvtupgrades.toString(2).length-1] == "1"
				},
				{
					desc: "Post-4000 cultivator scaling is square rooted.",
					cost: new Decimal(5.9e3),
					id: 1,
					bought: player.cvtupgrades.toString(2)[player.cvtupgrades.toString(2).length-2] == "1"
				},
				{
					desc: "For every 200 bought cultivator/hive double their respective production.",
					cost: new Decimal(7.5e3),
					id: 2,
					bought: player.cvtupgrades.toString(2)[player.cvtupgrades.toString(2).length-3] == "1"
				},
				{
					desc: "Boost Cultivator and Hive production by bees^0.1.",
					cost: new Decimal(1e4),
					id: 3,
					bought: player.cvtupgrades.toString(2)[player.cvtupgrades.toString(2).length-4] == "1"
				},
			]
		},
		pus: function () {
			return [
				{
					title: "Effective Power",
					desc: "Plant power exponent x2.",
					cost: new Decimal(3),
					id: 0,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-1] == "1"
				},
				{
					title: "Volatility",
					desc: "Plantium no longer resets anything, only subtracts from plant and honey amount.",
					cost: new Decimal(5),
					id: 1,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-2] == "1"
				},
				{
					title: "Quick Unload",
					desc: "Machine speed is 0.1 seconds.",
					cost: new Decimal(6),
					id: 2,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-3] == "1"
				},				{
					title: "Solar factories",
					desc: "Factories do not consume plant power.",
					cost: new Decimal(200),
					id: 3,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-4] == "1"
				},
				{
					title: "Automate it 420",
					desc: "Unlock better automation.",
					cost: new Decimal(420),
					id: 4,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-5] == "1"
				},
				{
					title: "The Machine Room",
					desc: "You can buy more machines in the machines tab. This results in more plantium per tick. Also adds 4 more slots to a machine.",
					cost: new Decimal(2e3),
					id: 5,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-6] == "1"
				},
				{
					title: "The Machine Room II",
					desc: "You can input more plants into the machine, which returns more plantium (x1.5 for every OoM). This value is adjustable in the machines tab.",
					cost: new Decimal(1e4),
					id: 6,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-7] == "1"
				},
				{
					title: "Direct conversion",
					desc: "For every OoM of plantium, cultivators and hives are x1.5 as powerful.",
					cost: new Decimal(1e7),
					id: 7,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-8] == "1"
				},
				{
					title: "Super Generators",
					desc: "Unlock batteries.",
					cost: new Decimal(1e9),
					id: 8,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-9] == "1"
				},
				{
					title: "More Upgrades",
					desc: "Unlock cultivator upgrades and a second row of queen upgrades.",
					cost: new Decimal(1e11),
					id: 9,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-10] == "1"
				},
			]
		},
		hc: function () {
			return [
				{
					amt: player.combstructures[0],
					cost: Decimal.pow(1e5, player.combstrucures[0]).mul(1e5),
					id: 0,
					desc: "Produce honeycombs x2.5 faster.",
					boost: Decimal.pow(2.5, player.combstrutures[0]),
					effect: `x${toNot(Decimal.pow(2.5, player.combstrutures[0]))}`
				},
				{
					amt: player.combstructures[1],
					cost: Decimal.pow(1e15, player.combstrucures[1]).mul(1e20),
					id: 1,
					desc: "The 4th queen upgrade has a larger base based on plantium.",
					boost: player.plantium.add(1).pow(player.combstrutures[1].div(40)).sub(1),
					effect: `+${toNot(player.plantium.add(1).pow(player.combstrutures[1].div(40)).sub(1))}`
				},
				{
					amt: player.combstructures[2],
					cost: Decimal.pow(1e15, player.combstrucures[1]).mul(1e20),
					id: 2,
					desc: "Who knew bees were sentient? Anyway,  produce intelligence based on bees.",
					boost: player.plantium.add(1).pow(player.combstrutures[1].div(40)).sub(1),
					effect: `+${toNot(player.plantium.add(1).pow(player.combstrutures[2].div(40)).sub(1))}`
				},
			]
		}
	},
	methods: {
		toNot: toNot,
		getCvtScal: function (obj) {
			return obj.bought.lt(4000) ? obj.bought.lte(200) ? 
				obj.bought.mul(5).add(20) : 
				Decimal.pow(1.01, obj.bought.sub(200)).mul(1000) : Decimal.pow(this.cus[1].bought?Math.sqrt(1.1):1.1, obj.bought.sub(4000).mul(Decimal.pow(1.1, obj.bought.sub(20000)).max(1))).mul(2.7e19);
		},
		getCvtUpScal: function (obj) {
			return this.getNScal(2e3, obj.level.mul(Decimal.pow(2, obj.level.sub(50)).max(1)), 2e3);
		},
		getFacScal: function () {
			return player.factories.lt(30) ? getNScal(10, player.factories, 1e4) : getNScal(50, player.factories.sub(30).mul(Decimal.pow(1.5, player.factories.sub(100))), 1e34);
		},
		getGenScal: function () {
			return Decimal.pow(2, player.generators.sub(1).max(0));
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
		btoa: function (text) {
			return btoa(text);
		},
		save: save,
		load: load,
		expo: expo,
		impo: impo,
		reset: reset
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
		return {player: player}
	}
});
Vue.component("qubtn", {
	props: {
		obj: Object
	},
	template: `<button :class="'qu ' + (obj.bought?'b':(player.queens.amt.gte(obj.cost)?'u':'d'))" v-on:click="
	if (!obj.bought && player.queens.amt.gte(obj.cost)) {
		player.queens.upgrades += Math.pow(2, obj.id);
		player.queens.amt = player.queens.amt.sub(obj.cost);
	}" :disabled="player.queens.amt.lt(obj.cost) && !obj.bought" v-if="obj.id<4||pus[9].bought">{{obj.desc}}<br>Cost: {{toNot(obj.cost)}} Queens</button>`,
	data: () => {
		return {player: player}
	},
	methods: {
		toNot: toNot
	},
	computed: vdata.computed
});
Vue.component("cubtn", {
	props: {
		obj: Object
	},
	template: `<button :class="'cu ' + (obj.bought?'b':(player.cvt.bought.gte(obj.cost)&&player.hives.bought.gte(obj.cost)?'u':'d'))" v-on:click="
		if (!obj.bought && player.cvt.bought.gte(obj.cost)&&player.hives.bought.gte(obj.cost)) {
			player.cvtupgrades += Math.pow(2, obj.id);
			player.cvt.bought = player.cvt.bought.sub(obj.cost);
			player.cvt.total = player.cvt.total.sub(obj.cost);
			player.hives.bought = player.hives.bought.sub(obj.cost);
			player.hives.total = player.hives.total.sub(obj.cost);
		}" :disabled="player.cvt.bought.lt(obj.cost)&&player.hives.bought.lt(obj.cost) && !obj.bought">{{obj.desc}}<br>Cost: {{toNot(obj.cost)}} Bought Cultivators and Hives</button>`,
	data: () => {
		return {player: player}
	},
	methods: {
		toNot: toNot
	},
	computed: vdata.computed
});
Vue.component("pubtn", {
	props: {
		obj: Object
	},
	template: `<button :class="'pu ' + (obj.bought?'b':(player.plantium.gte(obj.cost)?'u':'d'))" v-on:click="
	if (!obj.bought && player.plantium.gte(obj.cost)) {player.plantiumupgrades += Math.pow(2, obj.id);player.plantium = player.plantium.sub(obj.cost);}" :disabled="player.plantium.lt(obj.cost) && !obj.bought"><b>{{obj.title}}</b><br>{{obj.desc}}<br>Cost: {{toNot(obj.cost)}} Plantium</button>`,
	data: () => {
		return {player: player}
	},
	methods: {
		toNot: toNot
	},
	computed: vdata.computed
});
Vue.component("hcbtn", {
	props: {
		obj: Object
	},
	template: `<button class="hc" v-on:click="
	if (player.honeycombs.gte(obj.cost) && player.combstructures.reduce((a, i) => a = a.add(i)).lte(space)) {
		player.combstructures[obj.id] += 1;
		player.honeycombs = player.honeycombs.sub(obj.cost);
	}" :disabled="player.honeycombs.lt(obj.cost) || player.combstructures.reduce((a, i) => a = a.add(i)).gte(space)"><b>Structure {{toNot(obj.id+1)}}</b><br>Amount: {{toNot(obj.amt)}}<br>{{obj.desc}}<br>Currently: {{obj.effect}}<br>Cost: {{toNot(obj.cost)}} Honeycombs</button>`,
	data: () => {
		return {player: player}
	},
	methods: {
		toNot: toNot
	},
	computed: vdata.computed
});
var vm = new Vue(vdata);