# hotcss
> 移动端布局解决方案  --- 简洁而不简单

- [介绍](#介绍)
	- [hotcss是什么鬼](#hotcss是什么鬼)
	- [hotcss可以解决什么问题](#hotcss可以解决什么问题)
- [获取](#获取)
- [开始使用](#开始使用)
	- [hotcss.js](#hotcssjs)
	- [hotcss.less/hotcss.scss](#hotcssss)
- [如何编译](#如何编译)
	- [配置gulp](#配置gulp)
	- [内置命令](#内置命令)

### 介绍

#### hotcss是什么鬼

`hotcss`不是一个库，亦不是一个框架。通俗点讲，这是一个解决方案。用于解决移动端布局中遇到的单位等问题。

`hotcss`遵循视觉一致性原则，即不同屏幕下页面比例是一致的，同时`hotcss`不提倡使用在跨设备的开发中（当然不提倡和不可以是两个概念）。

另外，为了辅助开发`hotcss`提供了gulp编译，可查看[如何编译](#如何编译)

#### hotcss可以解决什么问题

- `hotcss`不需要你再手动设置`viewport`，她会根据当前环境计算出最适合的`viewport`。
- 在使用`hotcss`的过程中，所有的单位应该使用px2rem，无论css中还是JS中。
- 上述提到的`所有的单位`并不准确，如果你需要解决移动端1px这个世纪难题，则可以直接写1px，而无需使用px2rem。并且，这个1px在所有设备中是真的1px。
- 同时`hotcss`支持单项目多设计图（设计图尺寸不一样），只需要在你的css中定义设计图尺寸即可

### 获取
可以使用`bower`或者`npm`来安装`hotcss`。
```
bower install hotcss --save
npm install hotcss --save
```
如果你不乐意使用这两种方法，也可以直接复制源码或者使用`git clone`等你喜欢的方式。

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

作为一个解决方案，怎么可能让你自己费心再找编译方法呢，没错，这些都已经为你准备好了，你需要做的就是按步骤配置一下即可。

#### 配置gulp
进入项目根目录，使用`cp`命令将`tools`文件夹复制到根目录，注意命令最后空格后有一个点。
```shell
cp -R bower_components/hotcss/src/tools .
cp -R node_modules/hotcss/src/tools .
```
进入tools目录，执行`npm install`安装必需的package。
```shell
cd tools/
npm install
```
配置`tools/config.js`怎么配置在注释里面都已经写的很清楚了，如仍然遇到问题，可以与我取得联系。

在`tools`目录下执行`gulp watch`即可开始开发。

#### 内置命令

- `gulp css`：仅编译css预编译文件。
- `gulp watch`：watch所配置文件，自动起http服务，同时自带编译，liveload等功能。
- `gulp release`：发布命令，根据配置文件编译/合并/压缩并生成，不处理html文件。
- `gulp release -html`：带上html命令，会把html一并压缩。


