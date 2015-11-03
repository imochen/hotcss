module.exports = {

	precompile : 'scss', //CSS预处理器类型['less','scss'];

	path : {
		src : './src/test/src', //源文件根目录
		dev : './src/test/dev', //开发编译根目录
		release : './src/test/release' //发布编译根目录
	},

	//以下路径均基于根目录

	html : {
		src : '*.html', //html文件路径
		watch : '*.html',
		dest : '/' //html文件输出路径
	},

	css : {
		src : 'css/2.scss', //CSS预处理文件路径，支持通配符，数组
		watch : 'css/*.scss', //watch
		dest : 'css/', //CSS文件输出目录
		concat : { //需要合并的文件key为合并后文件的name。value为合并的文件，支持通配符，数组。配置合并的文件不要再出现在src中，否则会出现编译重复。
			index : ['css/1.scss','css/3.scss'],
			home : ['css/2.scss']
		}
	},


	js : {
		src : 'js/*.js', //JS目录
		watch : 'js/*.js', //watch
		dest : 'js/', //JS输出目录
		concat : { //需要合并的文件key为合并后文件的name。value为合并的文件，支持通配符，数组。
			index : 'js/*.js'
		}
	}
}