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

	unit( x, y )
	{
		this.#pixelWidth = x;
		this.#pixelHeight = y;
	}

	clear()
	{
		this.#blocks = new bexBlocks();
	}

	image( a, b, c, d, image )
	{
		//console.log( c );
		//console.log( a );
		this.#pixelNX = c - a;
		this.#pixelNY = d - b;
		console.log( 'image data=', image );
		var data = new Array();
		var n = Math.floor( image.data.length / 4 );
		for ( var i = 0; i < n; i++ )
		{
			var x = i * 4;
			var color = [ 0, 0, 0, 0 ];
			color[ 0 ] = image.data[ x + 0 ];
			color[ 1 ] = image.data[ x + 1 ];
			color[ 2 ] = image.data[ x + 2 ];
			color[ 3 ] = image.data[ x + 3 ];
			data.push( [ 0, 0, color, 0 ] );
		}
		this.#blocks.data( data );
		//console.log( 'pixelNX =', this.#pixelNX );
		this.#blocks.reform( this.#pixelNX, this.#pixelNY );
		this.changed = 1;
		console.log( 'blocks=', this.#blocks );
	}

	generate( x, y, pixelWidth, pixelHeight )
	{
		this.#pixelNX = x;
		this.#pixelNY = y;
		this.#pixelWidth = pixelWidth;
		this.#pixelHeight = pixelHeight;
		return 0;
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
		if ( this.#pixels[ i ] )
			return this.#pixels[ i ].code;
		return 0;
	}

	setPixelCode( i, c )
	{
		if ( this.#pixels[ i ] )
		{
			var p = this.#pixels[ i ].code;
			this.#pixels[ i ].code = c;
			return p;
		}
		return -1;
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