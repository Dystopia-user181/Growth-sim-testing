let themes = ["Light", "Metro", "Dark", "Dark Metro"];
function switchTheme () {
	let index = themes.findIndex(function (n) {
		return (n == player.theme);
	});
	if (index == -1) {
		player.theme = "Light";
		document.getElementById("themes").innerHTML = "Theme: Light";
	} else {
		player.theme = themes[(index+1)%themes.length];
		document.getElementById("themes").innerHTML = "Theme: " + player.theme;
	}
	updateTheme();
}
let styles = document.getElementById("styles");
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
	document.getElementById("neonTg").innerHTML = "Neon: " + neonOnOff();
}
function updateTheme () {
	styles.setAttribute("href", "themes/" + player.theme + isNeon() + ".css");
	if (player.theme.includes("Dark")) {
		buttonTheme = {
			available: "#2B3535",
			unAvailable: "#505050"
		}
	} else {
		buttonTheme = {
			available: "#FFFFFF",
			unAvailable: "#A3A3A3"
		}
	}
}
function indicateBuy (param, element) {
	if ((player.money.m >= param.m && player.money.e >= param.e) || player.money.e > param.e) {
		document.getElementById(element).style.border = "2px solid green";
		if (player.neon) {
			document.getElementById(element).style.boxShadow = "0px 0px 8px 1px green";
		} else {
			document.getElementById(element).style.boxShadow = "0px 0px";
		}
		document.getElementById(element + "Max").style.border = "2px solid green";
		if (player.neon) {
			document.getElementById(element + "Max").style.boxShadow = "0px 0px 8px 1px green";
		} else {
			document.getElementById(element + "Max").style.boxShadow = "0px 0px";
		}
		document.getElementById(element).style.backgroundColor = buttonTheme.available;
		document.getElementById(element + "Max").style.backgroundColor = buttonTheme.available;
	} else {
		document.getElementById(element).style.border = "2px solid red";
		if (player.neon) {
			document.getElementById(element).style.boxShadow = "0px 0px 8px 1px red";
		} else {
			document.getElementById(element).style.boxShadow = "0px 0px";
		}
		document.getElementById(element + "Max").style.border = "2px solid red";
		if (player.neon) {
			document.getElementById(element + "Max").style.boxShadow = "0px 0px 8px 1px red";
		} else {
			document.getElementById(element + "Max").style.boxShadow = "0px 0px";
		}
		document.getElementById(element).style.backgroundColor = buttonTheme.unAvailable;
		document.getElementById(element + "Max").style.backgroundColor = buttonTheme.unAvailable;
	}
}
function indicateUnlock (param, element) {
	if (param.e > 0) {
		document.getElementById(element).style.border = "2px solid green";
		if (player.neon) {
			document.getElementById(element).style.boxShadow = "0px 0px 8px 1px green";
		} else {
			document.getElementById(element).style.boxShadow = "0px 0px";
		}
		document.getElementById(element).style.backgroundColor = buttonTheme.available;
	} else {
		document.getElementById(element).style.border = "2px solid red";
		if (player.neon) {
			document.getElementById(element).style.boxShadow = "0px 0px 8px 1px red";
		} else {
			document.getElementById(element).style.boxShadow = "0px 0px";
		}
		document.getElementById(element).style.backgroundColor = buttonTheme.unAvailable;
	}
}