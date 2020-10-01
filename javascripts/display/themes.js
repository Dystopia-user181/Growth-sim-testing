const themes = ["Dark", "Light", "Inverted Light", "Metro"];
const fonts = ["Monospace", "Serif", "Sans", "Iosevka"]
function theme() {
	if (themes.indexOf(player.option.theme)+1 >= 4) {
		player.option.theme = "Dark";
		return;
	}
	player.option.theme = themes[themes.indexOf(player.option.theme)+1];
}
function font() {
	if (fonts.indexOf(player.option.font)+1 >= 4) {
		player.option.font = "Monospace";
		return;
	}
	player.option.font = fonts[fonts.indexOf(player.option.font)+1];
}
