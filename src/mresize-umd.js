(function( root , factory ){

	if( typeof define === 'function' && define.amd ){
		//AMD
		define(factory);
	}else if( typeof exports === 'object' ){
		//Node , CommonJS之类
		module.exports = factory();
	}else{
		//直接暴露全局变量
		root.mresize = factory();
	}

})( window , function(){

	'use strict';

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

		window.document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px';

	}

	mresize();

	window.addEventListener( 'resize' , mresize , false );

	window.addEventListener( 'load' , mresize , false );

	setTimeout(function(){
		mresize();
	},0)

	return mresize;

});