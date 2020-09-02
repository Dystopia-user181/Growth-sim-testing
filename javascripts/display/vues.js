Vue.component("tabbtn", {
	props: {
		tab: String
	},
	template: `<button>{{tab}}</button>`
})
Vue.component("optionsbtn", {
	props: {
		text: String
	},
	template: `<button class="optionsbtn">{{text}}</button>`
})
var mainVue = new Vue({
	el: "#main",
	data: {
		player: player
	},
	computed: {
		price: function () {return Decimal.pow(1.5, this.player.marketing)},
		tabbtns: function () {
			return [
				{id: 1, req: true, tabname: "Plants", onclick: "player.navigation.tab = 'Plants'"},
				{id: 2, req: this.player.tutorial.unlockedMachine, tabname: "Machine", onclick: "player.navigation.tab = 'Machine'"},
				{id: 3, req: this.player.tutorial.madeFirstPlantium, tabname: "Plantium", onclick: "player.navigation.tab = 'Plantium'"},
				{id: 4, req: true, tabname: "Options", onclick: "player.navigation.tab = 'Options'"}
			];
		},
		options: function () {
			return {
				row1: [
					{id: 5, text: "Save", onclick: "save()"},
					{id: 6, text: "Load", onclick: "load(JSON.parse(localStorage.getItem('growthsimsave')))"},
					{id: 7, text: `Autosave: ${this.getnff(this.player.option.autosave)}`, onclick: "player.option.autosave = !player.option.autosave;"},
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
setTimeout(mainVue.$forceUpdate, 100);