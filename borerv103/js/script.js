class bexScript
{
	#blocks	 = new bexBlocks();
	#pixels 	 = new Array();
	#pixelNX  	 = 0;
	#pixelNY 	 = 0;
	#pixelWidth  = 0;
	#pixelHeight = 0;
	context     = 0;
	changed     = 0;

	constructor()
	{
		console.log( "created new bsScript" );
	}

	ctx( c )
	{
		this.context = c;
	}

	generate( x, y, pixelWidth, pixelHeight )
	{
		this.#pixelNX = x;
		this.#pixelNY = y;
		this.#pixelWidth = pixelWidth;
		this.#pixelHeight = pixelHeight;
		//var data = new Array();
		for ( var i = 0; i < y; i++ )
		{
			for ( var j = 0; j < x; j++ )
			{
				var pixel = new bexPixel( j, i, pixelWidth, pixelHeight );
				this.#pixels.push( pixel );
				//data.push( [ j, i, [ 0, 255, 0, 255 ], 0 ] );
			}
		}
		//this.#blocks.data( data );
		//console.log( 'import=', this.#blocks );
		//console.log( "generated bsScript pixels" );
		return this.pixels;
	}

	rect( a, b, c, d, color, context )
	{
		for ( var i = a; i < c; i++ )
		{
			for ( var j = b; j < d; j++ )
			{
				var n = ( i * this.#pixelNX ) + j;
				var pixel = this.#pixels[ n ];
				pixel.fill( color, context );
				//var block = this.#blocks.get( n );
				//block.fill( color, context );
			}
			
		}	
	}

	fill( color, context )
	{
		context.fillStyle = color;
		context.fillRect( 0, 0, 
			this.#pixelNX * this.#pixelWidth, 
			this.#pixelNY * this.#pixelHeight );
	}

	paint()
	{
		/*
		if ( !this.#pixels.length )
			return 0;
		//console.log( 'painting' );
		for ( var i = 0; i < this.#pixels.length; i++ )
		{
			var pixel = this.#pixels[ i ];
			pixel.paint( this.context );
		}
		*/
		//console.log( 'painting blocks' );
		this.#blocks.paint( this.context, this.#pixelWidth, this.#pixelHeight );
	}

	randomize( a, b, c, d, colors )
	{
		var data = new Array();
		for ( var i = a; i < c; i++ )
		{
			for ( var j = b; j < d; j++ )
			{
				var x 		= j;
				var y 		= i;
				var r 		= Math.random();
				var number 		= r * colors.length;
				var f 		= Math.floor( number );
				var color 		= [
					colors[ f ][ 0 ],
					colors[ f ][ 1 ],
					colors[ f ][ 2 ],
					colors[ f ][ 3 ]
				];
				data.push( [ x, y, color, f ] );
			}
		}
		this.#blocks.data( data );
	}

	mess( a, b, c, d, colors, context )
	{
		for ( var i = a; i < c; i++ )
		{
			for ( var j = b; j < d; j++ )
			{
				var n = ( i * this.#pixelNX ) + j;
				var pixel = this.#pixels[ n ];
				var r = Math.random();
				var number = r * colors.length;
				//console.log( r );
				var f = Math.floor( number );
				var color = [
					colors[ f ][ 0 ],
					colors[ f ][ 1 ],
					colors[ f ][ 2 ],
					colors[ f ][ 3 ]
				];
				var cd = color;
				//console.log( 'cd =', cd );
				
				pixel.fill( cd, context );
			}
			
		}
	}

	width()
	{
		return this.#pixelNX;
	}

	getBlocks()
	{
		return this.#blocks;
	}

	getPixelNX()
	{
		return this.#pixelNX;
	}

	getPixelNY()
	{
		return this.#pixelNY;
	}

	getPixelWidth()
	{
		return this.#pixelWidth;
	}

	getPixelHeight()
	{
		return this.#pixelHeight;
	}

	getPixelCode( i )
	{
		return this.#pixels[ i ].code;
	}

	setPixelCode( i, c )
	{
		this.#pixels[ i ].code = c;
	}

	getPixel( i )
	{
		return this.#pixels[ i ];
	}

	getPixelColor( i )
	{
		return this.#pixels[ i ].color;
	}

	setPixelColor( i, color )
	{
		this.#pixels[ i ].color = color;
	}

	log()
	{
		console.log( this.#pixels );
	} 
}