var gulp = require('gulp'); //gulp
var sass = require('gulp-ruby-sass'); //sass编译
var less = require('gulp-less'); //less编译
var minifyCss = require('gulp-minify-css'); //css压缩
var autoprefixer = require('gulp-autoprefixer'); //自动补全前缀

var LessPluginFunctions = require('less-plugin-functions'); //less functions插件
functions = new LessPluginFunctions();

var uglify = require('gulp-uglify'); //js压缩

var htmlmin = require('gulp-htmlmin'); //html压缩

var rimraf = require('gulp-rimraf'); //清理目录

var livereload = require('gulp-livereload'); //实时刷新

var replace = require('gulp-replace'); //内容替换

var gulpSequence = require('gulp-sequence'); //队列执行

var path = require('path'); //path

var webserver = require('gulp-webserver'); //server

var myIP = require('my-ip');//获取本机内网IP


/**********************华丽的分割线*****************************/

var config = require('./config'); //加载配置文件
	mode = 'dev';

var livereloadString = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script></head>";

var __src = function( dirname ){
	return path.join( config.path.src , dirname );
}

var __dest = function( dirname ){
	return path.join( config.path[mode] , dirname );
}


/*------------------------------*/

gulp.task('webserver', function() {
	gulp.src( '../' )
		.pipe(webserver({
			host : myIP(),
			port : config.port,
			open : 'http://'+ myIP() +':'+config.port+'/dev',
			fallback : 'index.html'
		}));
});

gulp.task('css',function(){

	gulp.src( __dest(config.css.src) , { read : false} ).pipe(rimraf({ force: true })); //清理目录

	if( config.precompile === 'scss' ){
		return sass( __src(config.css.src) )
			.pipe(autoprefixer())
			.pipe( gulp.dest( __dest( config.css.dest) ) )
			.pipe(livereload());
	}
	if( config.precompile === 'less' ){
		return gulp.src( __src(config.css.src) )
			.pipe( less({ plugins : [functions]}))
			.pipe(autoprefixer())
			.pipe( gulp.dest( __dest( config.css.dest) ) )
			.pipe(livereload());
	}

});

gulp.task('img',function(){
	gulp.src( __dest(config.img.src) , { read : false} ).pipe(rimraf({ force: true })); //清理目录

	gulp.src( __src( config.img.src))
		.pipe( gulp.dest(__dest( config.img.dest)));
});

gulp.task('html',function(){

	gulp.src( __dest(config.html.src) , { read : false} ).pipe(rimraf({ force: true })); //清理目录
	if( mode === 'dev' ){
		return gulp.src( __src( config.html.src ) )
			.pipe( replace(/\<\/head\>/, livereloadString ))
			.pipe( gulp.dest(__dest( config.html.dest)) )
			.pipe(livereload());
	}else{
		return gulp.src( __src( config.html.src ) )
			.pipe( gulp.dest(__dest( config.html.dest)) )
			.pipe(livereload());
	}
	

});

gulp.task('js',function(){

	gulp.src( __dest(config.js.src) , { read : false} ).pipe(rimraf({ force: true })); //清理目录

	return gulp.src( __src(config.js.src) )
			.pipe( gulp.dest( __dest( config.js.dest) ) )
			.pipe(livereload());

});

gulp.task('watch-css',function(){
	gulp.watch( __src( config.css.src) ,['css'] );
});

gulp.task('watch',['html','css','js','img','webserver'],function(){

	livereload.listen();

	gulp.watch( __src( config.html.src) ,['html'] );
	gulp.watch( __src( config.css.src) ,['css'] );
	gulp.watch( __src( config.js.src) ,['js'] );
	gulp.watch( __src( config.img.src) ,['img'] );

});

gulp.task('js-min',['js'],function(){
	gulp.src( __dest(config.js.src) )
		.pipe( uglify() )
		.pipe( gulp.dest( __dest(config.js.dest) ) )
});
gulp.task('css-min',['css'],function(){
	gulp.src( __dest(config.css.src).replace(/(.less|.scss)$/,'.css') )
		.pipe( minifyCss() )
		.pipe( gulp.dest( __dest( config.css.dest) ) )
});

gulp.task('html-min',['html'],function(){
	gulp.src( __dest(config.html.src) )
		.pipe( htmlmin({collapseWhitespace: true}) )
		.pipe( gulp.dest( __dest( config.html.dest) ) )
});


gulp.task('release',function( cb ){
	mode = 'release';
	if( process.argv[3] === '-html'){
		gulpSequence('js-min','html-min','css-min','img',cb);
	}else{
		gulpSequence('js-min','html','css-min','img',cb);
	}
	
});







