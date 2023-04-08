var codex = new Array();
codex.push ( 
	function move( borer ) {
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		if ( n )
			borer.index = ( ( n * 1000 ) + borer.index + ( borer.maiden * borer.step ) ) % n;
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
	function originx( borer ) {
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		if ( n )
			borer.origin = ( ( n * 1000 ) + borer.origin + ( borer.maiden * borer.step ) ) % n;
	} 
);

codex.push ( 
	function originy( borer ) {
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		var m = x * borer.height;
		if ( m )
		{
			borer.origin = ( ( n * 1000 ) + ( m * borer.maiden * borer.step ) ) % n;
		}
	} 
);

codex.push (
	function direction( borer ) {
		borer.maiden *= -1;
	}
);

codex.push ( 
	function height( borer ) {
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		var scanner = borer.scanners.cursed();
		if ( scanner )
			borer.height = scanner.pos;
	} 
);

codex.push (
	function movey( borer ) {
		var x = borer.script.getPixelNX();
		var y = borer.script.getPixelNY();
		var n = x * y;
		var m = x * borer.height;
		if ( m )
		{
			borer.index = ( ( n * 1000 ) + ( m * borer.maiden * borer.step ) ) % n;
		}
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
/*
codex.push (
	function brighten( borer ) {
		//alert( 'brighten' );
		var blocks = borer.script.getBlocks();
		var b = blocks.at( borer.index );
		if ( !b )
			return;
		var inc = 50;
		if ( b.age )
			inc = Math.floor( 50 / b.age );
		inc *= borer.maiden;
		//inc = 50;
		b.color[ 0 ] = ( 255 + b.color[ 0 ] + inc ) % 255;
		b.color[ 1 ] = ( 255 + b.color[ 1 ] + inc ) % 255;
		b.color[ 2 ] = ( 255 + b.color[ 2 ] + inc ) % 255;
		b.age += 1;
		borer.script.changed = 1;
	}
);
*/
codex.push (
	function reap( borer ) {
		var blocks = borer.script.getBlocks();
		var b = blocks.at( borer.index );
		if ( !b )
			return;
		var colors = borer.colorInformation;
		if ( colors )
		{
			var blend = 0;
			var dx = 0;
			var di = -1;
			for ( var i = 0; i < colors.length; i++ )
			{
				var distance = 0;
				for ( var j = 0; j < 3; j++ )
					distance += Math.abs( colors[ i ][ j ] - b.color[ j ] );
				//console.log( 'distance =', distance );
				if ( distance < 60 )
				{
					if ( di == -1 )
					{
						dx = distance;
						di = i;
					}
					if ( distance < dx )
					{
						dx = distance;
						di = i;
					}
				}
			}

			if ( di >= 0 )
			{
				blend = 1;
				for ( var j = 0; j < 3; j++ )
				{
					colors[ di ][ j ] += ( 
						colors[ di ][ j ] - b.color[ j ] 
					) / ( 1 + borer.pos );
					if ( colors[ di ][ j ] < 0 )
						colors[ di ][ j ] = 0;
					if ( colors[ di ][ j ] > 255 )
						colors[ di ][ j ] = 255;
					colors[ di ][ 3 ] += 1; // age
				}
			}
			if ( !blend )
				borer.colorInformation.push( b.color );
		}
		
	}
);

var codex_basic = codex;
