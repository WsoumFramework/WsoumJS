/*!
 * WsoumJs JavaScript Library v1.0.0
 * https://framework.wsoum.ml/wsoumjs/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright (c) Wsoum
 * Released under the MIT license
 * https://framework.wsoum.ml/wsoumjs/license
 *
 * Date: 2020-01-16 22:42 GMT+1
 */

( function( global, factory ) {

	"use strict";
	
	
//alert("hhh");


	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get WsoumJS.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var WsoumJS = require("wsoumjs")(window);
		// See ticket #14549 for more info.
		
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "WsoumJS requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of WsoumJS 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `WsoumJS.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "1.0.0",

	// Define a local copy of WsoumJS
	WsoumJS = function( selector, context ) {

		// The WsoumJS object is actually just the init constructor 'enhanced'
		// Need init if WsoumJS is called (just allow error to be thrown if not included)
		return new WsoumJS.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

WsoumJS.holdReady = function( hold ) {
	if ( hold ) {
		WsoumJS.readyWait++;
	} else {
		WsoumJS.ready( true );
	}
};
WsoumJS.isArray = Array.isArray;
WsoumJS.parseJSON = JSON.parse;
WsoumJS.nodeName = nodeName;
WsoumJS.isFunction = isFunction;
WsoumJS.isWindow = isWindow;
WsoumJS.camelCase = camelCase;
WsoumJS.type = toType;

WsoumJS.now = Date.now;

WsoumJS.isNumeric = function( obj ) {

	// As of WsoumJS 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = WsoumJS.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since WsoumJS can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase wsoumjs is used because AMD module names are
// derived from file names, and WsoumJS is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of WsoumJS, it will work.

// Note that for maximum portability, libraries that are not WsoumJS should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. WsoumJS is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "wsoumjs", [], function() {
		return WsoumJS;
	} );
}




var

	// Map over WsoumJS in case of overwrite
	_WsoumJS = window.WsoumJS,

	// Map over the W in case of overwrite
	_W = window.W;

WsoumJS.noConflict = function( deep ) {
	if ( window.W === WsoumJS ) {
		window.W = _W;
	}

	if ( deep && window.WsoumJS === WsoumJS ) {
		window.WsoumJS = _WsoumJS;
	}

	return WsoumJS;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.WsoumJS = window.W = WsoumJS;
}




return WsoumJS;
} );