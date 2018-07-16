let config = {
  namespace: 'WEB_LOG_MONITOR',
  reportRate: 20,        //出现问题，上报的几率
  ajaxCacheMax: 100,     //最大缓存ajax条数
  clickCacheMax: 100,    //最大缓存click条数
  jsWhiteList: [
    {
      errorMessage: '',
      url: ''
    }
  ],       //js错误白名单
  ajaxWhiteList: [],     //ajax错误白名单
  send(type, json){      //上报规则
    let rate = parseInt( Math.random()*100 ) + 1;
    if(this.rate > config.reportRate) return false;
    switch(type){
      case 'jsError':
        break;
      case 'ajaxError':
        break;
    }
  }
}
export default config;