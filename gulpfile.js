var config = require('./config'), //配置文件
	
	gulp = require('gulp'), //gulp

	clean = require('gulp-clean'), //清理目录

	minifyCss = require('gulp-minify-css'), //css压缩
	concat = require('gulp-concat'),//文件合并

	htmlmin = require('gulp-htmlmin'), //html压缩
	
	sass = require('gulp-ruby-sass'), //sass编译
	
	uglify = require('gulp-uglify'), //js压缩

	less = require('gulp-less'), //less编译
	LessPluginFunctions = require('less-plugin-functions'), //less functions插件
	functions = new LessPluginFunctions(),

	gulpSequence = require('gulp-sequence'), //gulp顺序执行插件

	livereload = require('gulp-livereload'), //实时刷新
	
	mode = 'dev',

	__src = function( path ){ //源文件目录
		return config.path.src + '/' + path;
	},
	__dest = function( path ){ //dest根目录
		return config.path[mode] + '/' + path;
	},


	__files = function( files ){

		if( typeof files === 'string' ){
			return __src( files );
		}else{
			var tmp = [];
			files.forEach(function( value ){
				tmp.push( __src(value) );
			});
			return tmp;
		}

	};


gulp.task('html',function(){
	gulp.src( __dest( config.html.watch) , { read : false }).pipe(clean());
	return gulp.src( __src( config.html.src ) )
		.pipe( gulp.dest(__dest( config.html.dest)) )
		.pipe(livereload())
});

gulp.task('css',function(){

	gulp.src( __dest( config.css.watch) , { read : false }).pipe(clean());

	if( config.precompile === 'less' ){
		var concatConf = config.css.concat;
		if( typeof config.css.src !== 'undefined'){
			gulp.src( __src(config.css.src) )
				.pipe( less({ plugins : [functions]}))
				.pipe( gulp.dest( __dest( config.css.dest) ) )
				.pipe(livereload())
		}

		if( typeof concatConf !== 'undefined' ){
			for( var name in concatConf ){
				var files = __files( concatConf[name]);
				gulp.src( files )
					.pipe( less({ plugins : [functions]}))
					.pipe( concat( name + '.css') )
					.pipe( gulp.dest( __dest( config.css.dest) ) )
					.pipe(livereload())
			}
		}
	}
	if( config.precompile === 'scss' ){
		var concatConf = config.css.concat;

		if( typeof config.css.src !== 'undefined'){
			sass( __src(config.css.src) )
				.pipe( gulp.dest( __dest( config.css.dest) ) )
				.pipe(livereload())
		}

		if( typeof concatConf !== 'undefined' ){
			for( var name in concatConf ){
				var files = __files( concatConf[name]);
				sass( files )
					.pipe( concat( name + '.css') )
					.pipe( gulp.dest( __dest( config.css.dest) ) )
					.pipe(livereload())
			}
		}
	}

})

gulp.task('js',function(){
	var concatConf = config.js.concat;

	gulp.src( __dest( config.js.watch) , { read : false }).pipe(clean());

	if( typeof config.js.src !== 'undefined' ){
		gulp.src( config.js.src )
			.pipe( concat( name + '.js') )
			.pipe( gulp.dest( __dest( config.js.dest) ) )
			.pipe(livereload())
	}
	if( typeof concatConf !== 'undefined' ){
		for( var name in concatConf ){
			var files = __files( concatConf[name]);
			gulp.src( files )
				.pipe( concat( name + '.js') )
				.pipe( gulp.dest( __dest( config.js.dest) ) )
				.pipe(livereload())
		}
	}
});

gulp.task('hotcss-release-js',function(){
	return gulp.src('./src/hotcss.js')
		.pipe( uglify() )
		.pipe( gulp.dest('./dest'));
});

gulp.task('hotcss-release-css',function(){
	return gulp.src(['./src/hotcss.mixins.less','./src/hotcss.mixins.scss'])
		.pipe( gulp.dest('./dest'));
});

gulp.task('hotcss-release',['hotcss-release-js','hotcss-release-css']);

gulp.task('watch',function(){

	livereload.listen();

	gulp.watch( __src( config.html.watch) , function( file ){
		gulp.run('html');
	});

	gulp.watch( __src( config.css.watch) , function( file ){
		gulp.run('css');
	});

	gulp.watch( __src( config.js.watch) , function( file ){
		gulp.run('js');
	});

});

gulp.task('html-min',function(){
	mode = 'release';
	gulp.src( __dest( config.html.watch) , { read : false }).pipe(clean());
	return gulp.src( __src( config.html.src ) )
		.pipe( htmlmin({collapseWhitespace: true}) )
		.pipe( gulp.dest(__dest( config.html.dest)) )
});

gulp.task('js-min',function(){
	mode = 'release';
	var concatConf = config.js.concat;

	gulp.src( __dest( config.js.watch) , { read : false }).pipe(clean());

	if( typeof config.js.src !== 'undefined' ){
		gulp.src( config.js.src )
			.pipe( concat( name + '.js') )
			.pipe(uglify())
			.pipe( gulp.dest( __dest( config.js.dest) ) )
			
	}
	if( typeof concatConf !== 'undefined' ){
		for( var name in concatConf ){
			var files = __files( concatConf[name]);
			gulp.src( files )
				.pipe( concat( name + '.js') )
				.pipe(uglify())
				.pipe( gulp.dest( __dest( config.js.dest) ) )
		}
	}
});

gulp.task('css-min',function(){
	mode = 'release';
	gulp.src( __dest( config.css.watch) , { read : false }).pipe(clean());

	if( config.precompile === 'less' ){
		var concatConf = config.css.concat;
		if( typeof config.css.src !== 'undefined'){
			gulp.src( __src(config.css.src) )
				.pipe( less({ plugins : [functions]}))
				.pipe( minifyCss() )
				.pipe( gulp.dest( __dest( config.css.dest) ) )
		}

		if( typeof concatConf !== 'undefined' ){
			for( var name in concatConf ){
				var files = __files( concatConf[name]);
				gulp.src( files )
					.pipe( less({ plugins : [functions]}))
					.pipe( concat( name + '.css') )
					.pipe( minifyCss() )
					.pipe( gulp.dest( __dest( config.css.dest) ) )
			}
		}
	}
	if( config.precompile === 'scss' ){
		var concatConf = config.css.concat;

		if( typeof config.css.src !== 'undefined'){
			sass( __src(config.css.src) )
				.pipe( minifyCss() )
				.pipe( gulp.dest( __dest( config.css.dest) ) )
		}

		if( typeof concatConf !== 'undefined' ){
			for( var name in concatConf ){
				var files = __files( concatConf[name]);
				sass( files )
					.pipe( concat( name + '.css') )
					.pipe( minifyCss() )
					.pipe( gulp.dest( __dest( config.css.dest) ) )
			}
		}
	}
});

gulp.task('release',function( cb ){
	gulpSequence('js-min','html-min','css-min' , cb );
});






