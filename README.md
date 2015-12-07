# hotcss
> 让移动端布局开发更加容易

### 介绍
`hotcss`不是一个库，也不是一个框架。它是一个移动端布局开发解决方案。使用`hotcss`可以让移动端布局开发更容易。

`hotcss`遵循视觉一致性原则。在不同大小的屏幕和不同的设备像素密度下，让你的页面看起来是一样的。

`hotcss`不仅便捷了你的布局，同时它使用起来异常简单。
可能你要说 `talk is cheap,show me the code`，那我现在列下hotcss整个项目的目录结构。

```
├── example		//所有的示例都在这个目录下
│   └── index.html
└── src		//主要文件在这里
    └── hotcss.js
```

### 用法

```
<script src="/path/to/hotcss.js"></script>
``` 

`hotcss.js`必须尽可能早的加载，千万不要放到`<body>`标签后面或者异步加载它。
如果可以，你应将`hotcss.js`的内容以内嵌的方式写到`<head>`标签里面进行加载，并且在别的js文件之前。



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