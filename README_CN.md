#hotcss
>一个简单的移动端开发布局解决方案

使用动态的HTML font-size 和 rem。

####mresize.js

`mresize-normal.js` , 会在window上注册一个`window.mresize`方法;

`mresize-umd.js` , UMD通用模块

```javascript
	require(['mresize-umd'],function( mresize ){
		mresize();
	});
```

如果你需要手动触发mresize,否则可以直接加载此JS而无需主动调用`mresize()`方法。


####mixins.scss

```scss
	@import 'mixins'
```

在`mixins.scss`里面。你可以修改`designWidth`设计图宽度，按照你拿到的设计图宽度。

然后，你就可以直接使用在设计图中测量出得 像素值，而无需再做任何转换。

```scss
	.title{
		width : px2rem(500);
		height : px2rem(50);
	}
```

####工具

编译scss文件，可以使用如下的GUI工具

codekit : http://incident57.com/codekit/

koala : http://www.koala-app.com/

或者你也可以使用compass，Sublimetext插件等等。

####相关文档

scss : http://www.w3cplus.com/sassguide/

##更新

####2015.10.10
>为了在高清屏下使用1像素, 增加了meta头的缩放, 加载的时候会根据dpr来计算缩放比例


------