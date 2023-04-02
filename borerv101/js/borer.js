
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
	origin = 2080;

	constructor()
	{
		var sequence = [ 29, 6, 2, 11, 15, 28, 2, 22, 23, 27, 6, 25, 17, 29, 2, 30, 7, 23, 17, 28, 10, 29, 4, 26, 22, 26, 24, 9, 1, 27, 24, 15, 4, 27, 9, 30, 8, 10, 19, 13, 12, 7, 8, 17, 8, 1, 12, 19, 7, 6, 28, 26, 23, 29, 31, 29, 11, 4, 27, 28, 24, 21, 27, 13 ];

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
