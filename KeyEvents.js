document.addEventListener("keydown", function (e) {
	if (e.which == 77) {
		buyMax('1');
		if (player.resets.m > 0) {
			buyMax('2');
		}
		if (player.resets.m > 1 || player.resets.e > 0) {
			buyMax('3');
		}
		if (player.resets.m > 2 || player.resets.e > 0) {
			buyMax('4');
		}
		buyMax('ef');
	}
	if (e.which == 49) {
		buyMax('1');
	}
	if (e.which == 50 && player.resets.m > 0) {
		buyMax('2');
	} 
	if (e.which == 51 && player.resets.m > 1 || player.resets.e > 0) {
		buyMax('3');
	}
	if (e.which == 52 && player.resets.m > 2 || player.resets.e > 0) {
		buyMax('4');
	}
	if (e.which == 69) {
		buyMax('ef');
	}
	if (e.which == 68) {
		if (player.resets.m < 3 && player.resets.e <= 0) {
			unlock();
		} else {
			reset('1');
		}
	}
});