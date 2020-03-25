document.addEventListener("keydown", function (e) {
	if (e.which == 77) {
		buyMax('1');
		if (player.resets.gte(new Decimal(1))) {
			buyMax('2');
		}
		if (player.resets.gte(new Decimal(2))) {
			buyMax('3');
		}
		if (player.resets.gte(new Decimal(3))) {
			buyMax('4');
		}
		buyMax('ef');
	}
	if (e.which == 49) {
		buyMax('1');
	}
	if (e.which == 50 && player.resets.gte(new Decimal(1))) {
		buyMax('2');
	} 
	if (e.which == 51 && player.resets.gte(new Decimal(2))) {
		buyMax('3');
	}
	if (e.which == 52 && player.resets.gte(new Decimal(3))) {
		buyMax('4');
	}
	if (e.which == 69) {
		buyMax('ef');
	}
	if (e.which == 68) {
		if (!player.resets.gte(new Decimal(3))) {
			unlock();
		} else {
			reset('1');
		}
	}
});