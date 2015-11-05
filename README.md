# hotcss
> 移动端布局解决方案  --- 简洁而不简单

- [介绍](#介绍)

- [获取](#获取)

- [开始使用](#开始使用)

	-- [hotcss.js](#hotcssjs)

	-- [hotcss.**ss](#hotcssss)

- [如何编译](#如何编译)


### 介绍

### 获取
可以使用`bower`或者`npm`来安装`hotcss`。
```
bower install hotcss --save
npm install hotcss --save
```

### 开始使用

#### hotcss.js
引入`hotcss.js`，该JS必须在`<body>`前加载，如果能内嵌到HTML中，效果更好。当然这个JS是非常小的，只有区区几行，压缩后更是不值一提，建议使用内嵌方式直接写到`<head>`里面。
```html
<!-- /index.html-->
<script src="./bower_components/hotcss/dist/hotcss.js"></script>
```
注意事项:
- 不能将此JS放到`<body>`后加载，或者异步加载。这样会导致加载完毕后页面一团乱，然后会有明显的视觉跳动，继而才会恢复正常。

#### hotcss.**ss
根据你使用的css预编译语言，将`hotcss.less`/`hotcss.scss` import到你的less/scss文件中去，然后定义你的设计图宽度`designWidth`。
```javascript
/*	/src/scss/style.scss */
@import '../../bower_components/hotcss/dist/hotcss.scss';
$designWidth : 750;
```

```javascript
/*	/src/less/style.less  */
@import '../../bower_components/hotcss/dist/hotcss.less';
@designWidth : 750;
```
注意事项:
- 如果你的设计图都是同样的宽度，你可以去`hotcss.**ss`中直接定义全局`designWidth`。
- 每个css预编译文件都需要导入`hotcss.**ss`,如果你没有全局的`designWidth`，还需要定义`designWidth`。
- 在css预编译文件中使用`px2rem(375)`，尺寸是你在设计图上测量出来的px值，无需经过任何处理。直接交给`px2rem`即可。

### 如何编译

