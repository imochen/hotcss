# hotcss
> 让移动端布局开发更加容易

### 介绍

- `hotcss`不是一个库，也不是一个框架。它是一个移动端布局开发解决方案。使用`hotcss`可以让移动端布局开发更容易。

- 使用动态的HTML根字体大小和动态的viewport scale。

- 遵循视觉一致性原则。在不同大小的屏幕和不同的设备像素密度下，让你的页面看起来是一样的。

- 不仅便捷了你的布局，同时它使用起来异常简单。可能你会说 `talk is cheap,show me the code`，那我现在列下hotcss整个项目的目录结构。

```javascript
├── example	//所有的示例都在这个目录下
│   ├── duang
│   ├── normal
│   └── wolf
│
└── src	//主要文件在这里
    ├── hotcss.js
    ├── px2rem.less
    └── px2rem.scss
```

| 示例名称      |     演示地址 |  贡献者 |
| :-------- |:-------- | :--------: | 
| 普通的演示    |   http://imochen.github.io/hotcss/example/normal/ | 墨尘 | 
| duang游戏    |   http://imochen.github.io/hotcss/example/duang/ | [阳阳](https://github.com/iwuly)|
| 灰太狼    |   http://imochen.github.io/hotcss/example/wolf/ | [阳阳](https://github.com/iwuly) |


### 谁在用hotcss

- [美丽说HIGO](http://higo.meilishuo.com/)
- [奇虎360](http://www.360.com/)
- [爆米兔](http://www.baomitu.com/)
- [一起作业](http://17zuoye.com/)
- [TalkingData](http://www.talkingdata.com/)
- [电兔TV](http://www.diantu.tv/?from=hotcss)
- [新浪show](http://show.sina.com.cn/)

### 优势

- 保证不同设备下的统一视觉体验。
- 不需要你再手动设置`viewport`，根据当前环境计算出最适合的`viewport`。
- 支持任意尺寸的设计图，不局限于特定尺寸的设计图。
- 支持单一项目，多种设计图尺寸，专为解决大型，长周期项目。
- 提供`px2rem`转换方法，CSS布局，零成本转换，原始值不丢失。
- 有效解决移动端真实1像素问题。

### 用法

#### 引入hotcss.js

```html
<script src="/path/to/hotcss.js"></script>
``` 

<del>`hotcss.js`必须尽可能早的加载，千万不要放到`body`标签后面或者异步加载它。</del>
根据页面渲染机制，`hotcss.js`必须在其他JS加载前加载，万不可异步加载。

如果可以，你应将`hotcss.js`的内容以内嵌的方式写到`<head>`标签里面进行加载，并且保证在其他js文件之前。

为了避免不必要的bug，请将CSS放到该JS之前加载。

#### css要怎么写

你可能已经注意到在`src/`目录下有`px2rem.scss/px2rem.less`两个文件。没错，这就是`hotcss`提供的将px转为rem的方法。

推荐使用scss来编写css，在scss文件的头部使用`import`将`px2rem`导入

```scss
@import '/path/to/px2rem.scss';
```

如果你的项目是单一尺寸设计图，那么你需要去px2rem.scss中定义全局的`designWidth`。
```scss
@function px2rem( $px ){
	@return $px*320/$designWidth/20 + rem;
}
$designWidth : 750; //如设计图是750
```
如果你的项目是多尺寸设计图，那么就不能定义全局的`designWidth`了。需要在你的业务`scss`中单独定义。如以下是`style.scss`
```scss
@import '/path/to/px2rem.scss';
$designWidth : 750; //如设计图是750
```
`$designWidth`必须要在使用`px2rem`前定义。否则scss编译会出错。


注意：如果使用less，则需要引入`less-plugin-functions`，普通的less编译工具无法正常编译。

#### 想用px怎么办？
直接写px肯定是不能适配的，那`hotcss.js`会在html上注册`data-dpr`属性，这个属性用来标识当前环境dpr值。那么要使用px可以这么写。
```scss
//scss写法
#container{
	font-size: 12px ;
	[data-dpr="2"] &{
		font-size: 24px;
	}
	[data-dpr="3"] &{
		font-size: 36px;
	}
}
```

### 接口说明

#### initial-dpr
可以通过强制设置dpr。来关闭响应的viewport scale。使得viewport scale始终为固定值。

```html
<meta name="hotcss" content="initial-dpr=1">
<script src="/path/to/hotcss.js"></script>
<!--
如iphone微信强设dpr=1，则可以长按识别二维码。
注意，强制设置dpr=1后，css中的1px在2x，3x屏上则不再是真实的1px。
-->
```

#### max-width
通过设置该值来优化平板/PC访问体验，注意该值默认值为540。设置为0则该功能关闭。
为了配合使用该设置，请给body增加样式`width:16rem;margin:0 auto;`。
```html
<meta name="hotcss" content="max-width=640">
<script src="/path/to/hotcss.js"></script>
<!--
默认为540，可根据具体需求自己定义
-->
<style>
body{
	width: 16rem;
	margin: 0 auto;
}
</style>
```

#### design-width
通过对design-width的设置可以在本页运行的JS中直接使用`hotcss.px2rem/hotcss.rem2px`方法，无需再传递第二个值。

```html
<meta name="hotcss" content="design-width=750">
<script src="/path/to/hotcss.js"></script>
```

#### hotcss.mresize
用于重新计算布局，一般不需要你手动调用。
```javascript
hotcss.mresize();
```
#### 单位转换hotcss.px2rem/hotcss.rem2px
`hotcss.px2rem` 和 `hotcss.rem2px`。<del>你可以预先设定`hotcss.designWidth`</del>可以在meta中设置`design-width`，则之后使用这两个方法不需要再传递第二个参数。

迭代后仍然支持在js中设置`hotcss.designWidth`，推荐使用meta去设置。

```javascript
/**
* [px2rem px值转换为rem值]
* @param  {[number]} px          [需要转换的值]
* @param  {[number]} designWidth [设计图的宽度尺寸]
* @return {[number]}             [返回转换后的结果]
*/
hotcss.px2rem( px , designWidth );

/**
* 同上。
* 注意：因为rem可能为小数，转换后的px值有可能不是整数，需要自己手动处理。
*/
hotcss.rem2px( rem , designWidth );


//你可以在meta中定义design-width，此后使用px2rem/rem2px，就不需要传递designWidth值了。同时也支持旧的设置方式，直接在JS中设置hotcss.designWidth
hotcss.px2rem(200);
hotcss.rem2px(350);
```

### 辅助开发资源

- [hotcss Sulime text 代码片段](https://github.com/imochen/hotcss/issues/7) -- 感谢[dctxf](https://github.com/dctxf)提供
- [koala<中文，免费>](http://koala-app.com/index-zh.html)
- [codekit<功能丰富，收费>](http://incident57.com/codekit/)