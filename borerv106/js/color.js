		function componentToHex( c ) {
  			var hex = c.toString(16);
  			return hex.length == 1 ? "0" + hex : hex;
		}

		function rgbToHex( color ) {
			
			return "#" + componentToHex( color[ 0 ] ) + componentToHex( color[ 1 ] ) + componentToHex( color[ 2 ] );
		}

		function hexToRGB( hex ) {
			var r = parseInt( hex.slice(1, 3), 16 );
			var g = parseInt( hex.slice(3, 5), 16 );
			var b = parseInt( hex.slice(5, 7), 16 );

			return [ r, g, b ];
		}