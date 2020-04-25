document.addEventListener("keydown", function (e) {
	switch (e.which) {
		case 77:
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
		case 49:
		buyMax('1');
		case 50: 
		if (player.resets.gte(new Decimal(1))) {
			buyMax('2');
		} 
		case 51: 
		if (player.resets.gte(new Decimal(2))) {
			buyMax('3');
		}
		case 52: 
		if (player.resets.gte(new Decimal(3))) { 
			buyMax('4');
		}
		case 69: 
		buyMax('ef');
		break;
		case 68:
		if (!player.resets.gte(new Decimal(3))) {
			unlock();
		} else {
			reset('1');
		}
		break;
		case 67:
		buyCompt('computer');
		buyCompt('server');
		buyCompt('memory');
		buyCompt('power');
		break;
		default:
		console.log('F u');
		break;
	}
});