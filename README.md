#hotcss
>a simple layout solution for mobile development

use `rem` and dynamic html `font-size` 

##mresize.js

`mresize-normal.js` , it can register a method in window `window.mresize`;

`mresize-umd.js` , for AMD & CMD or normal;

```javascript
	require(['mresize-umd'],function( mresize ){
		mresize();
	});
```

if you need to take the initiative to trigger events, otherwise you do not need to trigger `mresize()`;


##mixins.scss

```scss
	@import 'mixins'
```

look at mixins.scss, you can change the `designWidth` to your design width .

then you can use px from your design, do not need transform it to others;

```scss
	.title{
		width : px2rem(500);
		height : px2rem(50);
	}
```

##tools

for compile scss you can use gui tools :

codekit : http://incident57.com/codekit/

koala : http://www.koala-app.com/

also you can use compass or sublimetext plug-in and so on ...

##related document

scss : http://www.w3cplus.com/sassguide/


##update

####2015.10.10
>in order to use 1px in retina screen, add scale to the resize, on load ,it can set meta viewport with dpr


------
