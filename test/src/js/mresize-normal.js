;(function( window , document ){

	"use strict";

	var mresize = function(){

		var innerWidth = window.innerWidth;

		if( !innerWidth ){ return false;}

		document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px';

	};

	mresize();

	window.addEventListener( 'resize' , mresize , false );

	window.addEventListener( 'load' , mresize , false );

	window.mresize = mresize;


})( window , document );