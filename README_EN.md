# hotcss
> Make Mobile Development Layout More Easy ！

### Intro

`hotcss` is not a library , also is not a framework . it is a solution for mobile development layout . use `hotcss` can make mobile development layout more easy . 

`hotcss` follow the rule of visual consistency . that is in different screen and different dpr , make your page seems to be same . 

`hotcss` make layout more easy，also  it is very easy to use ！
maybe you say talk is cheap , now I will show you the directory of `hotcss`
```
├── README.md
├── bower.json
├── example		//here is all examples
│   └── index.html
├── package.json
└── src		//here is the main file dir
    └── hotcss.js
```

### Usage

```
<script src="/path/to/hotcss.js"></script>
``` 

`hotcss.js` must be loaded as soon as possible , you can not put it after `<body>` or use via async .

If possible , you should put the content of `hotcss.js` into the `<head>`, and before other js files . 


### Apis

- Set the meta scale to 1
```
<meta name="hotcss" content="initial-dpr=1">
<script src="/path/to/hotcss.js"></script>
```
- Functions
```javascript
//recalculate layout
hotcss.mresize();

//conversion px to rem
hotcss.px2rem( px , designWidth );

//you can define hotcss.designWidth first
hotcss.designWidth = 750;
hotcss.px2rem(200);
hotcss.px2rem(350);
```