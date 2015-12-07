# hotcss
> 让移动端布局开发更加容易

### 介绍

- `hotcss`不是一个库，也不是一个框架。它是一个移动端布局开发解决方案。使用`hotcss`可以让移动端布局开发更容易。

- 遵循视觉一致性原则。在不同大小的屏幕和不同的设备像素密度下，让你的页面看起来是一样的。

- 不仅便捷了你的布局，同时它使用起来异常简单。可能你要说 `talk is cheap,show me the code`，那我现在列下hotcss整个项目的目录结构。

```
├── example		//所有的示例都在这个目录下
│   └── index.html
└── src		//主要文件在这里
    └── hotcss.js
```

### 优势

- 保证不同设备下的统一视觉体验。
- 不需要你再手动设置`viewport`，根据当前环境计算出最适合的`viewport`。
- 支持任意尺寸的设计图，不再局限于[640,750,1125]。
- 支持单一项目，多种设计图尺寸，专为解决大型，长周期项目。
- 提供`px2rem`转换方法，CSS布局，零成本转换，原始值不丢失。
- 有效解决移动端真实1像素问题。

### 用法

#### 引入hotcss.js

```
<script src="/path/to/hotcss.js"></script>
``` 

`hotcss.js`必须尽可能早的加载，千万不要放到`<body>`标签后面或者异步加载它。
如果可以，你应将`hotcss.js`的内容以内嵌的方式写到`<head>`标签里面进行加载，并且在别的js文件之前。

#### css要怎么写

你可能已经注意到在`src/`目录下有`px2rem.scss/px2rem.less`两个文件。没错，这就是`hotcss`提供的将px专为rem的方法。

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



### 接口说明

- 强制设置DPR为1
```
<meta name="hotcss" content="initial-dpr=1">
<script src="/path/to/hotcss.js"></script>
```
- 方法
```javascript
//重新计算布局，一般不需要你手动调用。
hotcss.mresize();

//将px转换为rem。
hotcss.px2rem( px , designWidth );

//你可以预先定义hotcss.designWidth，此后使用px2rem，就不需要传递designWidth值了
hotcss.designWidth = 750;
hotcss.px2rem(200);
hotcss.px2rem(350);
```