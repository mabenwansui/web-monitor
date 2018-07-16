import config from '../config';

export default function gc(type, arr){
  switch(type){
    case 'click':
      arr.length > config.clickCacheMax * 2 && arr.splice(config.clickCacheMax);
      break;
    case 'ajax':
      arr.length > config.ajaxCacheMax * 2 && arr.splice(config.ajaxCacheMax);
      break;
  }
}