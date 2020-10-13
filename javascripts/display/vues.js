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
	template: `<button :class="'qu '+(obj.bought?'b':(player.queens.amt.gte(obj.cost)?'u':'d'))" :onclick="'if ('+!obj.bought+' && player.queens.amt.gte('+obj.cost+')) {player.queens.upgrades += ' + Math.pow(2, obj.id) + ';player.queens.amt = player.queens.amt.sub('+obj.cost+')}'" :disabled="player.queens.amt.lt(obj.cost) && !obj.bought">{{obj.desc}}<br>Cost: {{toNot(obj.cost)}} Queens</button>`,
	data: () => {
		return {player: player}
	},
	methods: {
		toNot: toNot
	}
});
Vue.component("pubtn", {
	props: {
		obj: Object
	},
	template: `<button :class="'pu '+(obj.bought?'b':(player.plantium.gte(obj.cost)?'u':'d'))" :onclick="'if ('+!obj.bought+' && player.plantium.gte('+obj.cost+')) {player.plantiumupgrades += ' + Math.pow(2, obj.id) + ';player.plantium = player.plantium.sub('+obj.cost+')}'" :disabled="player.plantium.lt(obj.cost) && !obj.bought"><b>{{obj.title}}</b><br>{{obj.desc}}<br>Cost: {{toNot(obj.cost)}} Plantium</button>`,
	data: () => {
		return {player: player}
	},
	methods: {
		toNot: toNot
	}
});
var vdata = {
	el: "#main",
	data: {
		player: player,
		Decimal: Decimal,
		toScientific: toScientific
	},
	computed: {
		beecapped: function () {return this.queenbeecap.mul(1e7).lt(player.bees);},
		pps: function () {return player.plants.picked.max(1).min(player.cvt.total.floor()).pow(this.qus[0].bought?2:1).mul(this.qus[3].bought?Decimal.pow(3, player.queens.amt).mul(player.queens.honey.add(10).log(10)):1).mul(Decimal.pow(1.5, player.cvt.level)).mul(this.hcvtboost).mul(this.plantpowbuff);},
		plantpowbuff: function () {return player.plantpow.add(1).pow(this.pus[0].bought?2.2:1.1);},
		hcvtboost: function () {return player.honey.add(1).pow(0.3);},
		hps: function () {return player.bees.min(player.plants.field).pow(0.5).mul(player.honeycombs.pow(0.3).add(1).mul(this.plantpowbuff));},
		qulimit: function () {return Decimal.pow(10000, this.qus[1].bought?1.5:1)},
		comps: function () {return player.hives.total.floor().pow(this.qus[0].bought?2:1).mul(this.plantpowbuff).mul(Decimal.pow(1.5, player.hives.level)).mul(Decimal.pow(player.queens.honey.div(player.queens.amt).max(0).min(this.qulimit).add(10).log(10), player.queens.amt));},
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
					{id: 12, text: `Theme`, el: ["Dark", "Light", "Inverted Light", "Metro", "Planty", "Cancer(BEWARE)"], it: "theme"},
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
					cost: new Decimal(5),
					id: 2,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-3] == "1"
				},
				{
					desc: "Cultivator production is boosted by Queens and Queen honey.",
					cost: new Decimal(5),
					id: 3,
					bought: player.queens.upgrades.toString(2)[player.queens.upgrades.toString(2).length-4] == "1"
				},
			]
		},
		pus: function () {
			return [
				{
					title: "Effective Power",
					desc: "Plant power exponent x2.",
					cost: new Decimal(5),
					id: 0,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-1] == "1"
				},
				{
					title: "Quick Unload",
					desc: "Machine speed is 0.1 seconds.",
					cost: new Decimal(6),
					id: 1,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-2] == "1"
				},
				{
					title: "Volatility",
					desc: "Plantium no longer resets anything, only subtracts from plant and honey amount.",
					cost: new Decimal(8),
					id: 2,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-3] == "1"
				},
				{
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
					desc: "You can buy more machines in the machines tab. This results in more plantium per tick. Also increases the capacity of machines by x5.",
					cost: new Decimal(2e3),
					id: 5,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-6] == "1"
				},
				{
					title: "Conversion",
					desc: "You can input more plants into the machine, which returns more plantium (x1.5 for every OoM). This value is adjustable in the machines tab.",
					cost: new Decimal(1e4),
					id: 6,
					bought: player.plantiumupgrades.toString(2)[player.plantiumupgrades.toString(2).length-7] == "1"
				},
			]
		}
	},
	methods: {
		toNot: toNot,
		getCvtScal: function (obj) {
			return obj.bought.lt(4000) ? obj.bought.lte(200) ? 
				obj.bought.mul(5).add(20) : 
				Decimal.pow(1.01, obj.bought.sub(200)).mul(1000) : Decimal.pow(1.1, player.cvt.bought.sub(4000)).mul(2.7e19);
		},
		getNSca: function (scal, num, normal) {
			return this.toNot(Decimal.pow(scal, num).mul(normal), 2);
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
}
var vm = new Vue(vdata);