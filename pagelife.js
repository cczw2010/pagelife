(function(scope){
	var ua = navigator.userAgent;
	var isWX = ua.indexOf('MicroMessenger') > -1;
	var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
	var isMobile = !!ua.match(/AppleWebKit.*Mobile.*/);
	var isChrome = ua.indexOf('Chrome') > -1;
	//
	var pageLife = {
		onCreate:null,		//页面重新渲染时
		onActive:null,		//页面激活时或者得到焦点时(切换tab，或者从   后台进入前台)
		onPause:null,		//页面暂停时或者失去焦点时（tab切换到其他页，或者webview进入后台时)
		onDesctory:null,	//页面销毁时，
	};
	// 页面渲染时，移动端大部分内嵌页面回退时会保留上次渲染内容，设计时要注意
	// 增加一个变量来就记录是否初始化过
	pageLife.__isInit = false;
	// 回退时，刷新时，跳转进入时会触发pageshow,微信android和chrome不会缓存历史页面
	window.addEventListener('pageshow',function(){
		// 没有初始化过的话则触发onCreate否则触发onActive
		if (this.__isInit) {
			this.onActive();
		}else{
			this.onCreate();
			this.__isInit = true;
		}
	}.bind(pageLife),false);
	// 切换前后台时
	document.addEventListener('visibilitychange',function(){
		// 没有初始化过的话则触发onCreate否则触发onActive
		if (document.visibilityState=='visible') {
			this.onActive();
		}else{
			this.onPause();
		}
	}.bind(pageLife),false);
	// 跳出时，微信android和chrome只触发beforeunload,其他触发pagehide
	var jumpEvent = (isAndroid&&isWX||isChrome)?'beforeunload':'pagehide';
	window.addEventListener(jumpEvent,function(){
		this.onDesctory();
	}.bind(pageLife),false);
	scope.pageLife = pageLife;
}(window));