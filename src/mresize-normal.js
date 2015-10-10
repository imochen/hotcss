;(function( window , document ){

	"use strict";

	(function(){
		var _meta = document.querySelector('meta[name="viewport"]'),
			dpr = window.devicePixelRatio || 1,
			scale = 1 / dpr,

			content = 'width=device-width, initial-scale='+ scale +', minimum-scale='+ scale +', maximum-scale='+ scale +', user-scalable=no';

		if( _meta ){
			_meta.setAttribute('content', content);
		}else{
			_meta = document.createElement('meta');
			_meta.setAttribute('name', 'viewport');
			_meta.setAttribute('content', content);
			document.head.appendChild( _meta );
		}
	})();

	var mresize = function(){

		var innerWidth = window.innerWidth;

		if( !innerWidth ){ return false;}

		document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px';

	};

	mresize();

	window.addEventListener( 'resize' , mresize , false );

	window.addEventListener( 'load' , mresize , false );

	setTimeout(function(){
		mresize();
	},0)

	window.mresize = mresize;


})( window , document );