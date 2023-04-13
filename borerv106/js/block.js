class bexBlocks
{
	#array = new Array();
	constructor()
	{

	}

	at( n )
	{
		return this.#array[ n ];
	}

	add( x )
	{
		this.#array.push( x );
	}

	data( array )
	{
		for ( var i = 0; i < array.length; i++)
		{	
			var data = array[ i ];
			var x = new bexBlock( data[ 0 ], data[ 1 ], data[ 2 ], data[ 3 ] );
			this.add( x );
		}
		//console.log( 'imported=', this );
	}

	array()
	{
		return this.#array;
	}

	reform( width, height )
	{
		for ( var i = 0; i < height; i++ )
		{
			for ( var j = 0; j < width; j++ )
			{
				var n = ( i * width ) + j;
				if ( this.#array[ n ] )
				{
					this.#array[ n ].x = j;
					this.#array[ n ].y = i;
				}
			}
		}
	}

	frompalettehex( colors )
	{
		var rgbcolors = new Array();
		for ( var i = 0; i < colors.length; i++ )
		{
			var color = hexToRGB( colors[ i ] );
			rgbcolors.push( color );
		}
		this.frompalettergb( rgbcolors );
		console.log( 'colors=', rgbcolors );
	}

	frompalettergb( colors )
	{
		for ( var i = 0; i < this.#array.length; i++ )
		{
			var block    = this.#array[ i ];
			//console.log( block.color );
			var values   = distance( block.color );
			//console.log( values );
			var index    = values[ 0 ];
			//console.log( 'index=', index );
			var d        = values[ 1 ];
			block.color[ 0 ] = colors[ index ][ 0 ];
			block.color[ 1 ] = colors[ index ][ 1 ];
			block.color[ 2 ] = colors[ index ][ 2 ];
		}

		function distance( color )
		{
			var index = 0;
			var dx = 765;
			for ( var i = 0; i < colors.length; i++ )
			{
				var d = 0;
				d += Math.abs( colors[ i ][ 0 ] - color[ 0 ] );
				d += Math.abs( colors[ i ][ 1 ] - color[ 1 ] );
				d += Math.abs( colors[ i ][ 2 ] - color[ 2 ] );
				//console.log( 'd=', d );
				//console.log( 'dx=', dx );
				if ( d < dx )
				{
					//console.log( 'dx is now=', d );
					dx = d;
					index = i;
				}
			}
			return [ index, d ];
		}
	}

	paint( context, pixelWidth, pixelHeight )
	{
		for ( var i = 0; i < this.#array.length; i++ )
		{
			var block = this.#array[ i ];
			block.paint( context, pixelWidth, pixelHeight );
		}
		//console.log('painted blocks');
	}
}

class bexBlock
{
	x 	 = 0;
	y 	 = 0;
	color  = [ 255, 0, 0, 255 ];
	code   = 0;
	age    = 0;
	constructor( x, y, color, code )
	{
		this.x = x;
		this.y = y;
		this.color[ 0 ] = color[ 0 ];
		this.color[ 1 ] = color[ 1 ];
		this.color[ 2 ] = color[ 2 ];
		this.color[ 3 ] = color[ 3 ];
		this.code = code;
	}

	paint( context, pixelWidth, pixelHeight )
	{
		//var c = document.getElementById("script");
		//context = c.getContext("2d");
		context.fillStyle = rgbToHex( this.color );
		//console.log( this.color );
		if ( this.color[ 0 ] >= 200 && this.color[ 1 ] >= 255 )
		{
			//console.log( 'painting white' );
			//context.fillStyle = "white";
		}
		//context.fillStyle = "black";
		//console.log( 'painting=', context.fillStyle );
		//console.log( context.fillStyle );
		//return;
		context.fillRect( 
			this.x * pixelWidth, 
			this.y * pixelHeight, 
			pixelWidth, 
			pixelHeight );
	}
}