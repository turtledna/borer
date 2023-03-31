
class bexBorer
{
	script  = 0;
	codex   = 0;
	index   = 0;
	body    = new Array();
	frames  = new Array();
	pos	  = 0;
	maiden  = 1;
	code    = 0;
	cvs     = 0;
	cursor  = 0; // codex cursor
	scanner = 0; // multiple scanners eventually; create, remove, to (each other),
	target  = 0; // scanner cursor
	scanners = 0;
	step    = 1;
	executing = 0;

	constructor()
	{
		var sequence = [ 3, 11, 19, 28, 1, 13, 22, 20, 3, 21, 28, 19, 22, 10, 1, 14, 14, 21, 1, 22, 3, 19, 6, 17, 20, 9, 10, 5, 29, 11, 22, 19, 11, 20, 5, 11, 14, 4, 21, 24, 23, 27, 30, 3, 10, 8, 27, 12, 6, 26, 3, 1, 29, 14, 3, 20, 5, 28, 12, 14, 12, 3, 27, 23, 22, 15, 3, 12, 20, 8, 11, 22, 16, 12, 14, 3, 26, 4, 2, 12, 19, 17, 21, 20, 25, 29, 4, 24, 8, 10, 2, 28, 2, 23, 17, 27, 3, 12, 12, 2, 3, 6, 19, 13, 10, 4, 0, 25, 2, 17, 23, 19, 0, 6, 24, 17, 10, 4, 3, 22, 3, 28, 27, 24, 5, 9, 4, 8, 4, 27, 12, 29, 3, 27, 2, 25, 20, 21, 2, 0, 29, 12, 6, 27, 21, 11, 1, 23, 28, 10, 3, 22, 9, 2, 30, 0, 14, 13, 30, 17, 21, 5, 10, 23, 15, 6, 5, 9, 17, 23, 17, 7, 26, 28, 10, 5, 30, 15, 13, 9, 16, 22, 4, 18, 8, 0, 10, 24, 10, 27, 21, 24, 20, 18, 20, 7, 12, 26, 3, 26, 29, 7, 5, 15, 26, 14, 7, 5, 30
		];

		for ( var i = 0; i < sequence.length; i++)
			this.body.push( sequence[ i ] );
	}

	canvas( canvas )
	{
		this.cvs = canvas;
	}

	attach( script )
	{
		this.script = script;
	}

	to( index )
	{
		this.index = 0;
	}

	program( codex )
	{
		this.codex = codex;
	}

	programindex( code )
	{
		this.code = code;
	}

	play()
	{
		var code = this.body[ this.pos ];
		//console.log( code );
		var f = this.codex[ code ];
		//console.log( f );
		if ( f )
			f( this );
		this.pos = ( this.pos + 1 ) % this.body.length;
		this.code = this.body[ this.pos ];
		if ( !this.pos )
		{
			var frame = new Array();
			for ( var i = 0; i < this.body.length; i++ )
				frame.push( this.body[ i ] );
			this.frames.push( frame );
		}
		//console.log( this );
	}

	paint()
	{
		var c = document.getElementById( "borer" );
		var ctx = c.getContext("2d");
		// Setup a palette for codex codes
		var palette = [
			'#000000','#222034','#45283c','#663931',
			'#8f563b','#df7126','#eec39a','#fbf236',
			'#99e550','#6abe30','#37946e','#4b692f',
			'#524b24','#323c39','#3f3f74','#306082',
			'#5b6ee1','#639bff','#5fcde4','#cbdbfc',
			'#ffffff','#9badb7','#847e87','#696a6a',
			'#595652','#76428a','#ac3232','#d95763',
			'#d77bba','#8f974a','#8a6f30','#333333'
		];

		// Fill the background with white
		ctx.clearRect( 0, 0, 
			500 * 5, 
			500 * 5 );

		// Fill the body
		var scriptWidth = this.script.width();
		var cornerX = ( this.index % scriptWidth );
		var cornerY = Math.floor( this.index / scriptWidth );

		var linex = Math.ceil( Math.sqrt( this.body.length ) );
		var liney = linex;

		var blocks = new Array();
		for ( var i = 0; i < this.body.length; i++ )
		{
			var x = i % linex;
			var y = Math.floor( i / linex );
			x += cornerX;
			y += cornerY;
			x *= this.script.getPixelWidth();
			y *= this.script.getPixelHeight();
			//console.log( [ x, y ] );
			var code = this.body[ i ];
			var color = palette[ code ];
			ctx.fillStyle = color;
			if ( i == this.pos )
				ctx.fillStyle = "white";
			else if ( this.scanners )
			{
				//console.log( this.scanners );
				//this.scanners.test();
				//console.log( this.scanners.fetchArray );
				var array = this.scanners.fetchArray();
				for ( var k = 0; k < array.length; k++ )
				{
					var s = array[ k ];
					if ( i == s.pos )
					{
						//console.log( 'using style=blue' );
						ctx.fillStyle = "blue";
					}
				}
			}

			ctx.fillRect( x, y, 5, 5 );
			//var x = this.script.getPixelWidth() * i;
			//var y = this.script.getPixelHeight() * Math.floor( i / scriptWidth );	
		}


	}
}
