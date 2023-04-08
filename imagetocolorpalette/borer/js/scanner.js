class bexScanners
{
	#array = new Array();
	#cursor = 0;
	//t = '';
	constructor()
	{
		var scanner = new bexScanner();
		this.add( scanner );
		this.#cursor = 0;
		//this.t = 'hello';
	}

	at()
	{
		return this.#cursor;
	}

	add( scanner )
	{
		this.#array.push( scanner );
	}

	test()
	{
		//console.log( 'test=1' );
	}

	fetchScanner( i )
	{
		var array = this.#array[ i ];
		return array;
	}

	fetchArray()
	{
		return this.#array;
	}

	move( i, range )
	{
		var s = this.#array[ i ];
		if ( s )
		{
			s.age += 1;
			s.pos = ( range + s.pos + s.step ) % range;
			if ( s.age > s.death )
			{
				this.#array.splice( i, 1 );
				this.#cursor = ( this.#array.length + this.#cursor ) % this.#array.length;
			}
		}
	}

	age()
	{
		if ( this.#array.length )
		{
			//console.log( 'cursor=', this.#cursor );
			var s = this.cursed();
			s.age += 1;
			//console.log( 'age=', s.age );
			if ( s.age > s.death )
				this.remove();
		}
	}

	remove ()
	{
		if ( this.#array.length )
		{	
			//console.log( 'removing cursor' );
			this.#array.splice( this.#cursor, 1 );
			//console.log( 'checking cursor' );
			//if ( !this.#array[ this.#cursor ] )
			if ( this.#array.length )
				this.#cursor = ( this.#array.length + this.#cursor ) % this.#array.length;
			else
				this.#cursor = 0;
		}
	}

	next( maiden )
	{
		if ( this.#array.length )
			this.#cursor = ( this.#array.length + this.#cursor + maiden ) % this.#array.length;
	}

	cursed()
	{
		if ( this.#array.length )
			return this.#array[ this.#cursor ];
		return 0;
	}

	length()
	{
		return this.#array.length;
	}
}

class bexScanner
{	
	pos = 0;
	age = 0;
	death = 90;
	step = 1;

	move()
	{
		this.age += 1;
	}
}