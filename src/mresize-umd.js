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

	var mresize = function(){

		var innerWidth = window.innerWidth;

		if( !innerWidth ){ return false;}

		window.document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px';

	}

	mresize();

	window.addEventListener( 'resize' , mresize , false );

	window.addEventListener( 'load' , mresize , false );

	return mresize;

});