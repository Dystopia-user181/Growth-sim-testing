let themes = ["Light", "Metro", "Dark", "Dark Metro"];
function switchTheme () {
	let index = themes.findIndex(function (n) {
		return (n == player.theme);
	});
	if (index == -1) {
		player.theme = "Light";
		$("themes").innerHTML = "Theme: Light";
	} else {
		player.theme = themes[(index+1)%themes.length];
		$("themes").innerHTML = "Theme: " + player.theme;
	}
	updateTheme();
}
let styles = $("styles");
let buttonTheme = {
	available: "#2B3535",
	unAvailable: "#505050"
}
function isNeon () {
	if (player.neon) {
		return ("n");
	} else {
		return ("u");
	}
}
function neonOnOff () {
	if (player.neon) {
		return ("On");
	} else {
		return ("Off");
	}
}
function toggleNeon () {
	player.neon = !player.neon;
	$("neonTg").innerHTML = "Neon: " + neonOnOff();
}
function updateTheme () {
	styles.setAttribute("href", `themes/${player.theme}${isNeon()}.css`);
}
function indicateBuy (param, element) {
	if (player.money.gte(param)) {
		$(element).className = $(element).className.split(" ")[0]+" yes";
	} else {
		$(element).className = $(element).className.split(" ")[0]+" no";
	}
}
function indicateUnlock (param, element) {
	if (param.gte(new Decimal(15))) {
		$(element).className = $(element).className.split(" ")[0]+" yes";
	} else {
		$(element).className = $(element).className.split(" ")[0]+" no";
	}
}