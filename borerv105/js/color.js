		function componentToHex( c ) {
  			var hex = c.toString(16);
  			return hex.length == 1 ? "0" + hex : hex;
		}

		function rgbToHex( color ) {
			
			return "#" + componentToHex( color[ 0 ] ) + componentToHex( color[ 1 ] ) + componentToHex( color[ 2 ] );
		}