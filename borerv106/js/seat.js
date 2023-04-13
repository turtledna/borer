function imageSeat( event ) {
	console.log( event );
	let str = event.target.result;
	let img = document.createElement('img');
	console.log( 'str=', str );
	img.src = str;
	img.onload = function imageUploaded()
	{
		console.log( 'uploaded image' );
		console.log( event );

		borers = new Array();
		scripts = new Array();
		
		var app    = document.getElementById( "app" );
		app.innerHTML = '';
		app.width = 0;
		app.height = 0;

		var sample = document.getElementById( 'sample' );
		sample.innerHTML = '';
		sample.width = 0;
		sample.height = 0;

		/**
		 * Data
		 * Get the data from the uploaded image file
		 * Uses a temporary canvas which is cleared and removed
		 */
		var canvas = document.getElementById( 'image' );
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		context = canvas.getContext('2d');
		context.drawImage( img, 0, 0 );
		var data = context.getImageData( 0, 0, img.naturalWidth, img.naturalHeight );
		context.clearRect( 0, 0, img.naturalWidth, img.naturalHeight );
		canvas.width = 0;
		canvas.height = 0;

		var scaleX = img.naturalWidth;
		var scaleY = img.naturalHeight;

		var wrapper = document.createElement( 'div' );
		wrapper.style.position = "relative";
		wrapper.style.width = "100%";
		app.append( wrapper );

		/**
		 * Script
		 * Loads the background image
		 */
		var imageX = img.naturalWidth;
		var imageY = img.naturalHeight;
		var unitX = 1;
		var unitY = 1;
		var append = 0;
		var c = document.getElementById( 'script0' );
		if ( !c )
		{
			c    = document.createElement( 'canvas' );
			c.id = 'script0';
			c.style.position 	 = "absolute";
			append = 1;
		}
		var width = Math.min( 300, imageX );
		var height = Math.min( 200, imageY );
		var sX = width / ( imageX * unitX );
		var sY = height / ( imageY * unitY );
		//c.style.background = "red";
		c.width 		 = width;
		c.height 		 = height;
		if ( append )
			wrapper.append( c );
		
		var elem = document.getElementById( "script0" );
		var ctx = elem.getContext( "2d" );
		ctx.scale( sX, sY );
		var s = new bexScript();
		s.ctx( ctx );
		s.unit( unitX, unitY );
		s.image( 0, 0, imageX, imageY, data );
		scripts.push( s );

		if ( imageBorerOn )
		{
		/**
		 * Borer
		 * Loads the borer on top of the script
		 */
		var borer;
		var c = document.createElement( 'canvas' );
		c.id 			 = 'borer0';
		c.style.position   = "absolute";
		c.width 		 = width; // full scale image
		c.height 		 = height; // full scale image
		var ctx = c.getContext("2d");
		ctx.scale( sX, sY );
		wrapper.append( c );
		borer = new bexBorer();
		borer.attach( s );
		borer.canvas( c.id );
		borer.from( 
			Math.round
			( 
				( ( imageX * imageY ) / 2 ) 
				+ ( imageX / 2 ) 
			)
		);
		borer.feed( sequence );
		borer.program( codex );
		borers.push( borer );
		}
	}
}