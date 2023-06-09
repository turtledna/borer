var codex = new Array();
codex.push ( 
	function move( borer ) {
		/*
		if ( ( borer.index + borer.maiden ) > -1 )
			borer.index += borer.maiden;
		*/
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		borer.index = ( n + borer.index + borer.maiden ) % n;
		//if ( borer.index == 0 )
		//	alert( 'index=0' );
	} 
);
codex.push ( 
	function codex( borer ) {
		//if ( borer.body[ borer.cursor ] != 1 )
		borer.body[ borer.cursor ] = ( 
			borer.codex.length + ( borer.body[ borer.cursor ] + borer.maiden )
			) % borer.codex.length;
	} 
);
codex.push ( 
	function cursor( borer ) {
		borer.cursor = ( borer.codex.length + borer.cursor + borer.maiden ) % borer.codex.length;
	} 
);
codex.push ( 
	function scana( borer ) {
		if ( !borer.scanners )
			return 0;
		var scanner = borer.scanners.cursed();
		if ( scanner )
			borer.body[ scanner.pos ] = ( borer.codex.length + borer.body[ scanner.pos ] + borer.maiden ) % borer.codex.length;
	} 
);
codex.push ( 
	function scanf( borer ) { // and quietly remove codex also
		//borer.body[ borer.scanner ] = borer.cursor;
		if ( !borer.scanners )
			return 0;
		var scanner = borer.scanners.cursed();
		if ( scanner )
			borer.body[ scanner.pos ] = borer.cursor;
	} 
);
codex.push ( 
	function scani( borer ) { // scan the body to quietly remove codex
		// leans to moving the index forward
		if ( !borer.scanners )
			return 0;
		var i = borer.scanners.at();
		var range = borer.body.length;
		if ( i )
			borer.scanners.move( i, range );
	} 
);
codex.push (
	function direction( borer ) {
		borer.maiden *= -1;
	}
);
codex.push (
	function getp( borer ) {
		borer.body[ borer.pos ] = borer.script.getPixelCode( borer.index );
	}
);

codex.push (
	function getc( borer ) {
		//borer.cursor = borer.script.getPixelCode( borer.index );
		//console.log( borer.cursor );
	}
);
codex.push (
	function extend( borer ) {
		borer.body.push( 0 );
	}
);
codex.push (
	function chop( borer ) {
		//return;
		borer.body.pop();
		if ( borer.pos >= borer.body.length )
		borer.pos = 0;
		if ( borer.scanner >= borer.body.length )
		borer.scanner = 0;
	}
);
codex.push (
	function nudge( borer ) {
		var a = ( borer.body.length + borer.pos + borer.maiden ) % borer.body.length;
		var b = ( borer.body.length + borer.pos + ( borer.maiden * 2 ) ) % borer.body.length;
		var f = borer.body[ b ];
		borer.body[ b ] = borer.body[ a ]; 
		borer.body[ a ] = 0;
	}
);
codex.push (
	function step( borer ) {
		borer.step += borer.maiden;
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
		if ( borer.scanners.length() > 5 )
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
		borer.scanners.age();
	}
);

codex.push (
	function scanp( borer ) {
		if ( !borer.scanners )
			return;
		var cursed = borer.scanners.cursed();
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
	function jumpc( borer ) {
		return;
		borer.cursor = ( borer.codex.length + borer.cursor + borer.step ) % borer.codex.length;
	}
);

codex.push (
	function jumps( borer ) {
		borer.scanner = ( borer.body.length + borer.scanner + borer.step ) % borer.body.length;
	}
);

codex.push (
	function geta( borer ) {
		var x = ( borer.body.length + borer.pos + borer.maiden ) % borer.body.length;
		var f = borer.body[ x ];
		borer.body[ borer.pos ] = f;
	}
);
codex.push (
	function rotatea( borer ) {
		var x = ( borer.body.length + borer.pos + borer.maiden ) % borer.body.length;
		borer.body[ x ] = ( borer.codex.length + borer.body[ x ] + borer.maiden ) % borer.codex.length;
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
	function brighten( borer ) {
		//borer.script.setPixelColor( borer.index, [ 255, 255, 255, 255 ] );
		var blocks = borer.script.getBlocks();
		var b = blocks.at( borer.index );
		var inc = Math.floor( 50 / b.age );
		inc = 50;
		b.color[ 0 ] = b.color[ 0 ] + inc;
		if ( b.color[ 0 ] > 255 )
			b.color[ 0 ] = 255;
		b.color[ 1 ] = b.color[ 1 ] + inc;
		if ( b.color[ 1 ] > 255 )
			b.color[ 1 ] = 255;
		b.color[ 2 ] = b.color[ 2 ] + inc;
		if ( b.color[ 2 ] > 255 )
			b.color[ 2 ] = 255;
		b.age += 1;
		borer.script.changed = 1;
	}
);
codex.push (
	function swapa( borer ) {
		//if ( !borer.body[ borer.pos + borer.maiden ] )
			return;
		var x = ( borer.body.length + borer.pos + borer.maiden ) % borer.body.length;
		var f = borer.body[ x ];
		borer.body[ x ] = borer.body[ borer.pos ];
		borer.body[ borer.pos ] = f;
	}
);
codex.push (
	function swapp( borer ) {
		//return;
		var f = borer.script.getPixelCode( borer.index );
		borer.script.setPixelCode( borer.index, borer.body[ borer.pos ] );
		borer.body[ borer.pos ] = f;
	}
);
codex.push (
	function swapc( borer ) {
		//return;
		var f = borer.script.getPixelCode( borer.index );
		borer.script.setPixelCode( borer.index, borer.cursor );
		borer.cursor = f;
	}
);
codex.push (
	function age( borer ) {
		return;
		var pixel = borer.script.getPixel( borer.index );
		pixel.age += 1;
	}
);