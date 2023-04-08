/*
codex.push ( 
	function height( borer ) {
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		borer.height = ( n + borer.height + borer.maiden ) % n;
		//borer.height += 5;
	} 
);

codex.push ( 
	function temper( borer ) {
		borer.temper = ( 10 + borer.temper + borer.maiden ) % 10;
	} 
);

codex.push ( 
	function movey( borer ) {
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		//n /= 2;
		if ( !borer.height )
			return;
		var a = ( n / borer.height );
		if ( borer.temper )
			a *= ( 1 / borer.temper );
		var move = Math.round( a );
		borer.index = ( n + borer.index + move ) % n;
	} 
);

codex.push (
	function runa( borer ) {
		return;
		var x = ( borer.body.length + borer.pos + borer.maiden ) % borer.body.length;
		var code = borer.body[ x ];
		var f = borer.codex[ code ];
		f( borer );
	}
);

codex.push (
	function jumpc( borer ) {
		return;
		borer.cursor = ( borer.codex.length + borer.cursor + borer.step ) % borer.codex.length;
	}
);

codex.push (
	function age( borer ) {
		return;
		var pixel = borer.script.getPixel( borer.index );
		pixel.age += 1;
	}
);
*/