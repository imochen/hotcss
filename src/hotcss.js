(function (win, doc) {

  function parseMetaContent(name) {
    var ret = {};
    var el = doc.querySelector('meta[name="' + name + '"]');
    if (!el) return ret;
    el.content.split(/[,;]/).forEach(function (item) {
      var group = item.split('=');
      var name = group[0].trim();
      var value = (group[1] || '').trim();
      ret[name] = value;
    })
    return ret;
  }

  function json2MetaContent(json, sep) {
    sep = sep || ',';
    var ret = [];
    Object.keys(json).forEach(function (key) {
      ret.push(key + '=' + json[key]);
    })
    return ret.join(sep)
  }

  function resize(conf) {
    var dpr = conf['initial-dpr'];
    var maxWidth = conf['max-width'];
    var width = doc.documentElement.getBoundingClientRect().width || win.innerWidth;
    if (maxWidth > 0 && width / dpr > maxWidth) {
      width = maxWidth * dpr;
    }
    doc.documentElement.style.fontSize = (width * 20 / 320) + 'px';
  }

  var hotcssConf = Object.assign({
    'max-width': 540,
    'initial-dpr': Math.floor(window.devicePixelRatio)
  }, parseMetaContent('hotcss'));

  doc.documentElement.setAttribute('data-dpr', hotcssConf['initial-dpr']);
  doc.documentElement.setAttribute('max-width', hotcssConf['max-width']);

  var viewPortConf = Object.assign(parseMetaContent('viewport'), {
    width: 'device-width',
    'initial-scale': 1 / hotcssConf['initial-dpr'],
    'minimum-scale': 1 / hotcssConf['initial-dpr'],
    'maximum-scale': 1 / hotcssConf['initial-dpr'],
    'user-scalable': 'no'
  });
  var viewPortContent = json2MetaContent(viewPortConf);
  var viewPortEl = document.querySelector('meta[name=viewport]');
  if (viewPortEl) {
    viewPortEl.setAttribute('content', viewPortContent);
  } else {
    viewPortEl = doc.createElement('meta');
    viewPortEl.setAttribute('name', 'viewport');
    viewPortEl.setAttribute('content', viewPortContent);
    doc.head.appendChild(viewPortEl);
  }

  resize(hotcssConf);
  var resizeTimer = null;
  win.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize(hotcssConf);
    }, 33);
  }, false)

  window.addEventListener('load', function () {
    resize(hotcssConf);
  }, false);

  setTimeout(function () {
    resize(hotcssConf);
  }, 333)

})(window, document)