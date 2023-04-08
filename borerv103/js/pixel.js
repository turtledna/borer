class bexPixel
{
	#a = 0;
	#b = 0;
	#c = 0;
	#d = 0;
	color = [ 0, 0, 0, 0 ];
	code = 0;
	age = 1;
	
	constructor( x, y, pixelWidth, pixelHeight )
	{
		this.#a = x * pixelWidth;
		this.#b = y * pixelHeight;
		this.#c = ( x + 1 ) * pixelWidth;
		this.#d = ( y + 1 ) * pixelHeight;
	}

	fill( color, context )
	{
		this.color = [ 
			color[ 0 ],
			color[ 1 ],
			color[ 2 ],
			color[ 3 ]
		];
		//console.log( this.color );
		//console.log( color );
		context.fillStyle = rgbToHex( this.color );
		//console.log( context.fillStyle );
		context.fillRect( this.#a, this.#b, this.#c, this.#d );
	}

	paint( context )
	{
		context.fillStyle = rgbToHex( this.color );
		//console.log( 'painting=', context.fillStyle );
		//console.log( context.fillStyle );
		context.fillRect( this.#a, this.#b, this.#c, this.#d );
	}
	
}