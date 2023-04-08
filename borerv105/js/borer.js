
class bexBorer
{
	script  = 0;
	codex   = 0;
	index   = 0;
	body    = new Array();
	fed	  = new Array();
	frames  = new Array();
	pos	  = 0;
	maiden  = 1;
	code    = 0;
	cvs     = 0;
	cursor  = 0; // codex cursor
	scanners = 0;
	step     = 1;
	executing = 0;
	origin = 0;
	height = 0;
	temper = 0;
	stopped = 0;
	colorInformation = new Array();

	constructor()
	{
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
		this.index = index;
	}

	program( codex )
	{
		this.codex = codex;
	}

	from( origin )
	{
		this.origin = origin;
	}

	feed( array )
	{
		for ( var i = 0; i < array.length; i++)
		{
			this.body.push( array[ i ] );
			this.fed.push ( array[ i ] );
		}
	}

	play()
	{
		if ( this.stopped )
			return 0;
		var code = this.body[ this.pos ];
		//console.log( code );
		var f = this.codex[ code ];
		if ( f )
			f( this );
		//console.log( f );
		this.pos = ( this.pos + 1 ) % this.body.length;
		this.code = this.body[ this.pos ];
		if ( this.pos == 0 )
		{
			var frame = new Array();
			for ( var i = 0; i < this.body.length; i++ )
				frame.push( this.body[ i ] );
			this.frames.push( frame );
		}
		//console.log( this );
	}

	stop()
	{
		this.stopped = 1;
	}

	start()
	{	
		this.index  	= 0;
		this.body   	= this.fed;
		this.frames 	= new Array();
		this.pos    	= 0;
		this.maiden 	= 1;
		this.scanners 	= 0;
		this.step 		= 1;
		this.executing 	= 0;
		this.height 	= 0;
		this.temper 	= 0;
		this.stopped 	= 0;
		this.colorInformation = new Array();
		this.to( this.origin );

	}

	paint()
	{
		if ( this.stopped )
			return 0;
		if ( !this.cvs )
			return 0;
		var cvs = document.getElementById( this.cvs );
		var ctx = cvs.getContext("2d");

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
			500 * this.script.getPixelWidth(), 
			500 * this.script.getPixelHeight() );

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
			var px = this.script.getPixelWidth();
			var py = this.script.getPixelHeight();
			x += cornerX;
			y += cornerY;
			x *= px;
			y *= py;
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

			ctx.globalAlpha = 0.7;
			ctx.fillRect( x, y, px, py );
			//var x = this.script.getPixelWidth() * i;
			//var y = this.script.getPixelHeight() * Math.floor( i / scriptWidth );	
		}


	}
}
