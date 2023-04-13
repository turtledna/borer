/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit ( event, fn ) {
	//console.log( 'e=', e );
	console.log( 'event=', event );
	console.log( 'fn=', fn );
	
	// Stop the form from reloading the page
	event.preventDefault();

	// If there's no file, do nothing
	if ( !file.value.length ) return;

	// Create a new FileReader() object
	let reader = new FileReader();

	// Setup the callback event to run when the file is read
	console.log( 'event=', event );
	reader.onload = fn;

	// Read the file
	//console.log( file.files[ 0 ] );
	reader.readAsDataURL( file.files[0] );
}

function imageForm( fn )
{
	// Get the form and file field
	let form = document.querySelector( '#upload' );
	let file = document.querySelector( '#file' );
	let app  = document.querySelector( '#app' );

	// Listen for submit events
	form.addEventListener( 'submit', (e) => handleSubmit( e, fn ) );
}

/**
 * Log the uploaded file to the console
 * @param {event} Event The file loaded event
 */
function logFile ( event, fn ) {
	console.log( 'event=', event );
	console.log( 'fn=', fn );
	let str = event.target.result;
	let img = document.createElement('img');
	img.src = str;
	img.onload = function uploadedFile()
	{
		console.log( 'loaded str=', str );
		console.log( 'loaded image=', img );
		console.log( 'width=', img.naturalWidth );
		console.log( 'height=', img.naturalHeight );
	}
}

function imageSave()
{
	console.log( 'saving image' );

	var canvas = document.getElementById( "script0" );
	console.log( canvas );
	var button = document.getElementById( "bexHexSave" );
	console.log( button );
	//window.open( canvas.toDataURL('image/gif') );
	var gh = canvas.toDataURL('gif');
	var a = document.createElement( 'a' );
	document.body.appendChild( a ); // for Firefox
	a.href = gh;
	a.download = 'image.gif';
	a.click();
	//console.log( dataURL );
    	//button.href = dataURL;
/*
	var image = new Image();
	var data = new Array();
	var script = scripts[ 0 ];
	if ( script )
	{
		var blocks = script.getBlocks();
		var array  = blocks.array();
		for ( var i = 0; i < array.length; i++ )
		{
			var color = array[ i ].color;
			data.push( color );
		}
		console.log( data );
	}
*/
}