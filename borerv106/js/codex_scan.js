var codex = new Array();
codex.push ( 
	function scana( borer ) {
		if ( !borer.scanners )
			return 0;
		var scanner = borer.scanners.cursed();
		if ( scanner )
		{
			var x = ( borer.codex.length + borer.body[ scanner.pos ] + borer.maiden ) % borer.codex.length;
			if ( x < 0 )
				alert( 'error' );
			borer.body[ scanner.pos ] = x;
		}
	} 
);
codex.push ( 
	function scanf( borer ) { // and quietly remove codex also
		//borer.body[ borer.scanner ] = borer.cursor;
		if ( borer.cursor < 0 )
			alert( 'error 1' );
		if ( !borer.scanners )
			return 0;
		var scanner = borer.scanners.cursed();
		if ( scanner )
			borer.body[ scanner.pos ] = borer.cursor;
	} 
);
codex.push ( 
	function scani( borer ) {
		if ( !borer.scanners )
			return 0;
		var i = borer.scanners.at();
		var range = borer.body.length;
		if ( i )
			borer.scanners.move( i, range );
	} 
);

codex.push (
	function scanb( borer ) {
		if ( borer.scanners )
			return; // one instance
		borer.scanners = new bexScanners();
	}
);

codex.push (
	function scanm( borer ) {
		if ( !borer.scanners )
			return;
		if ( borer.scanners.length() > 10 )
			return;
		var scanner = new bexScanner();
		borer.scanners.add( scanner );
	}
);

codex.push (
	function scant( borer ) {
		if ( !borer.scanners )
			return;
		borer.scanners.next( borer.maiden );
	}
);

codex.push (
	function scanr( borer ) {
		if ( !borer.scanners )
			return;
		//console.log( borer );
		//console.log( borer.scanners );
		borer.scanners.age();
	}
);

codex.push (
	function scanp( borer ) {
		if ( !borer.scanners )
			return;
		var cursed = borer.scanners.cursed();
		if ( cursed )
			cursed.pos = borer.pos;
	}
);

codex.push (
	function scanh( borer ) {
		if ( !borer.scanners )
			return;
		var cursed = borer.scanners.cursed();
		//cursed.age += 30;
	}
);

codex.push (
	function scans( borer ) {
		if ( !borer.scanners )
			return;
		var cursed = borer.scanners.cursed();
		cursed.step += borer.maiden;
	}
);

codex.push (
	function scane( borer ) {
		if ( borer.executing )
			return;
		borer.executing = 1;
		if ( !borer.scanners )
			return;
		var cursed = borer.scanners.cursed();
		var pos = cursed.pos;
		var code = borer.body[ pos ];
		var f = borer.codex[ code ];
		if ( f ) 
			f( borer );
		borer.executing = 0;
	}
);

codex.push ( 
	function scanz( borer ) {
		if ( !borer.scanners )
			return 0;
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		var scanner = borer.scanners.cursed();
		if ( scanner )
			borer.index = ( ( n * 1000 ) + borer.index + ( scanner.pos * borer.maiden ) ) % n;
	} 
);

var codex_scan = codex;