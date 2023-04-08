var codex = new Array();
codex.push ( 
	function move( borer ) {
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		//console.log( 'borer.index before=', borer.index );
		if ( n )
			borer.index = ( ( n * 1000 ) + borer.index + borer.maiden ) % n;
		//console.log( 'borer.index after=', borer.index );
	} 
);
codex.push ( 
	function codex( borer ) {
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
	function origin( borer ) {
		borer.index = borer.origin;
	} 
);

codex.push (
	function direction( borer ) {
		borer.maiden *= -1;
	}
);
codex.push (
	function getp( borer ) {
		var x = borer.script.getPixelCode( borer.index );
		if ( x < 0 )
			alert( 'error 6' );
		borer.body[ borer.pos ] = x;
	}
);

codex.push (
	function extend( borer ) {
		borer.body.push( 0 );
	}
);
codex.push (
	function chop( borer ) {
		borer.body.pop();
		if ( borer.pos >= borer.body.length )
			borer.pos = 0;
		if ( borer.scanners )
		{
			var scanners = borer.scanners.fetchArray();
			for ( var i = 0; i < scanners.length; i++ )
			{
				var scanner = scanners[ i ];
				if ( scanner.pos >= borer.body.length )
					borer.scanner.pos = 0;
			}
		}
	}
);
codex.push (
	function nudge( borer ) {
		var a = ( borer.body.length + borer.pos + borer.maiden ) % borer.body.length;
		var b = ( borer.body.length + borer.pos + ( borer.maiden * 2 ) ) % borer.body.length;
		var f = borer.body[ b ];
		if ( a < 0 )
			alert( 'error 5' );
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
	function jumps( borer ) {
		borer.scanner = ( borer.body.length + borer.scanner + borer.step ) % borer.body.length;
	}
);

codex.push (
	function geta( borer ) {
		var x = ( borer.body.length + borer.pos + borer.maiden ) % borer.body.length;
		var f = borer.body[ x ];
		if ( f < 0 )
		{
			//f = 0;
			alert( 'error 4 borer.pos=' + borer.pos + ' body length=' + borer.body.length + 'x=' + x );
		}
		borer.body[ borer.pos ] = f;
	}
);
codex.push (
	function rotatea( borer ) {
		var x = ( borer.body.length + borer.pos + borer.maiden ) % borer.body.length;
		var y = ( borer.codex.length + borer.body[ x ] + borer.maiden ) % borer.codex.length;
		if ( y < 0 )
			alert( 'error 3' );
		borer.body[ x ] = y;
	}
);

codex.push (
	function brighten( borer ) {
		//borer.script.setPixelColor( borer.index, [ 255, 255, 255, 255 ] );
		var blocks = borer.script.getBlocks();
		//console.log( 'borer.index=', borer.index );
		var b = blocks.at( borer.index );
		if ( !b )
			return;
		var inc = 50;
		if ( b.age )
			inc = Math.floor( 50 / b.age );
		inc *= borer.maiden;
		//inc = 50;
		b.color[ 0 ] = ( 255 + b.color[ 0 ] + inc ) % 255;
		//if ( b.color[ 0 ] > 255 )
		//	b.color[ 0 ] = 255;
		b.color[ 1 ] = ( 255 + b.color[ 1 ] + inc ) % 255;
		//if ( b.color[ 1 ] > 255 )
		//	b.color[ 1 ] = 255;
		b.color[ 2 ] = ( 255 + b.color[ 2 ] + inc ) % 255;
		//if ( b.color[ 2 ] > 255 )
		//	b.color[ 2 ] = 255;
		b.age += 1;
		borer.script.changed = 1;
	}
);

var codex_basic = codex;
