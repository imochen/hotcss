module.exports = {

	precompile : 'scss', //CSS预处理器类型['less','scss'];

	port : 13097, //server端口

	path : {
		src : '../src', //源文件根目录
		dev : '../dev', //开发编译根目录
		release : '../release' //发布编译根目录
	},

	//以下路径均基于根目录

	html : {
		src : '/*.html', //html文件路径
		dest : '/' //html文件输出路径
	},

	css : {
		src : '/css/*.scss', //CSS预处理文件路径，支持通配符，数组
		dest : '/css/' //CSS文件输出目录
	},

	js : {
		src : '/js/*.js', //JS目录
		dest : '/js/' //JS输出目录
	},

	img : {
		src : '/img/*.*', //图片目录
		dest : '/img/' //图片输出目录
	}

}