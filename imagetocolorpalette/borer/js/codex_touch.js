var codex = new Array();
codex.push (
	function swapa( borer ) {
		return;
		//if ( !borer.body[ borer.pos + borer.maiden ] )
		//	return;
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
		//console.log( 'borer=', borer );
		//console.log( 'index=', borer.index );
		var f = borer.script.getPixelCode( borer.index );
		borer.script.setPixelCode( borer.index, borer.cursor );
		borer.cursor = f;
	}
);

// Store the codex
var codex_touch = codex;
