function tabTo(tab) {
	let tabs = document.getElementsByClassName("tab");
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].id !== tab) {
			$(tabs[i].id).style.display = "none";
		} else {
			$(tabs[i].id).style.display = "flex";
		}
	}
}