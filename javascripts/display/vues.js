Vue.component("tabbtn", {
	props: {
		tab: String,
		req: Boolean
	},
	template: `<button>{{tab}}</button>`
})
Vue.component("optionsbtn", {
	props: {
		text: String
	},
	template: `<button class="optionsbtn">{{text}}</button>`
})
var vm = new Vue({
	el: "#main",
	data: {
		player: player
	},
	computed: {
		beecapped: function () {return this.queenbeecap.mul(1e7).lt(player.bees);},
		price: function () {return Decimal.pow(1.5, player.marketing);},
		pps: function () {return player.plants.picked.max(1).min(player.cvt.total.floor()).mul(Decimal.pow(1.5, player.cvt.level)).mul(this.hcvtboost).mul(player.plantpow.add(1).pow(1.1));},
		hcvtboost: function () {return player.honey.add(1).pow(0.2);},
		hps: function () {return player.bees.min(player.plants.field).pow(0.5).mul(player.honeycombs.pow(0.3).add(1).mul(player.plantpow.add(1).pow(1.1)));},
		comps: function () {return player.hives.total.floor().pow(2).mul(player.plantpow.add(1).pow(1.1)).mul(Decimal.pow(player.queens.honey.div(player.queens.amt).max(0).min(1e4).add(10).log(10), player.queens.amt));},
		queenbeecap: function () {return player.queens.honey.div(player.queens.amt).max(0).min(6400).add(1).pow(0.5).pow(player.queens.amt);},
		tabbtns: function () {
			return [
				{id: 1, req: true, tabname: "Plants", onclick: "player.navigation.tab = 'Plants'"},
				{id: 2, req: player.tutorial.unlockedMachine, tabname: "Machine", onclick: "player.navigation.tab = 'Machine'"},
				{id: 3, req: player.tutorial.madeFirstPlantium, tabname: "Plantium", onclick: "player.navigation.tab = 'Plantium'"},
				{id: 4, req: true, tabname: "Options", onclick: "player.navigation.tab = 'Options'"}
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
					{id: 10, text: "Hard Rest", onclick: "reset()"}
				],
				row3: [
					{id: 11, text: `Theme: ${this.player.option.theme}`, onclick: "theme()"},
					{id: 12, text: `Notation: ${this.player.option.notation}`, onclick: "notation()"},
					{id: 13, text: `Font: ${this.player.option.font}`, onclick: "font()"}
				]
			}
		}
	},
	methods: {
		toNot: (decimal, places=0) => {
			return Function("decimal", "places", `"use strict";return to${(player.option.notation)}(decimal, places)`)(decimal, places);
		},
		getCvtScal: function (obj) {
			return this.toNot(obj.bought.lte(200) ? 
				obj.bought.mul(5).add(20) : 
				Decimal.pow(1.01, obj.bought.sub(200)).mul(1000), 2);
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
		reset: reset,
		theme: theme,
		notation: notation,
		font: font
	}
});
setTimeout(vm.$forceUpdate, 100);