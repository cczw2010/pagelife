
### pageLife

主要用于网页生命周期管理器。依托于 PageTransitionEven和 Page Visibility API实现.因为主要面向的是移动端内嵌app和微信。所以其他浏览器不保障运行正常。

适配： android>=4.4,ios>=7.1,ie>=11,safari>=6.1,chrome>=14,opera>=15，Firefox>=10;

#### api

    pageLife.onCreate		页面重新渲染时
    pageLife.onActive		页面激活时或者得到焦点时(切换tab，或者从后台进入前台)
    pageLife.onPause		页面暂停时或者失去焦点时（tab切换到其他页，或者webview进入后台时)
    pageLife.onDesctory	    页面销毁时。

### 移动端浏览器调研情况
>关闭网页的时候基本不触发任何事件。除了微信android跳转是略有不同，其他反应基本相同。

##### 微信IOS:
>值得注意的是微信会缓存html页面，**静态资源添加md5类型版本号（hash也不好使），入口html文件被缓存是设置服务端的缓存机制**。比如将nginx的缓存设置成{expires-1;}，设置成永远不缓存；

|操作|响应事件|值|备注
|---|---|---|---
|打开网页|onload->onpageshow||（扫码进入，跳转进入,刷新）之前网页内容不保留。重新渲染页面
|应用切换到后台|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|应用切换到前台|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染
|*链接跳出当前页|onpagehide||
|*后退返回当前页|onpageshow||保留之前页面渲染

##### ios safari
>微信浏览器的内核就是safari,所以所有事件与safari一样。不过safari多了个tab功能

|操作|响应事件|值|备注
|---|---|---|---
|。。。
|切换tab|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|切回tab|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染

#### 微信android(x5内核)
|操作|响应事件|值|备注
|---|---|---|---
|打开网页|onload->onpageshow||（扫码进入，跳转进入,刷新）之前网页内容不保留。重新渲染页面
|应用切换到后台|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|应用切换到前台|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染
|*链接跳出当前页|onbeforeunload||
|*后退返回当前页|onload->onpageshow||不保留之前页面渲染，等同于重新打开

##### android原生浏览器
|操作|响应事件|值|备注
|---|---|---|---
|打开网页|onload->onpageshow||（扫码进入，跳转进入,刷新）之前网页内容不保留。重新渲染页面
|应用切换到后台|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|应用切换到前台|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染
|*链接跳出当前页|onpagehide||
|*后退返回当前页|onpageshow||保留之前页面渲染
|切换tab|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|切回tab|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染


### 桌面现代浏览器调研情况(mac下)

##### chrome
|操作|响应事件|值|备注
|---|---|---|---
|打开网页|onload->onpageshow||（跳转进入,刷新）之前网页内容不保留。重新渲染页面
|最小化|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|*应用界面切换到后面|无|
|应用界面切换到前面|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染
|切换tab|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|切回tab|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染
|*链接跳出当前页|onbeforeunload||
|*后退返回当前页|onload->onpageshow||不保留之前页面渲染，等同于重新打开

##### safari

|操作|响应事件|值|备注
|---|---|---|---
|打开网页|onload->onpageshow->onvisibilitychange||（跳转进入,刷新）之前网页内容不保留。重新渲染页面
|最小化|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|*应用界面切换到后面|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|应用界面切换到前面|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染
|切换tab|onvisibilitychange|document.visibilityState==hidden|保留之前页面渲染
|切回tab|onvisibilitychange|document.visibilityState==visible|保留之前页面渲染
|*链接跳出当前页|onbeforeunload->onpagehide||
|*后退返回当前页|onpageshow||保留之前页面渲染



