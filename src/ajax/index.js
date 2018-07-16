import ah from 'ajax-hook';
import filter from './filter';
import logger from '../logger';

let _logger = logger();

export default function ajax(){
  ah.hookAjax({
    //hook callbacks
    onreadystatechange({xhr}){
      if(xhr.readyState === 4){      
        if(xhr.status !== 200){
          if(!filter(xhr.responseURL)){
            console.log(xhr);
            _logger.ajaxError(xhr);
          }
        }
      }
    },
    onload(xhr){
      console.log("onload called");
    },
    send(fromData, xhr){
      //let data = fromData.split('&').reduce((a, b)=> {
      //  let [key, value] = b.split('=');
      //  a[key] = value;
      //  return a;
      //}, {});
      //console.log(data);
      //console.log('====22');
      //window.maebnData.push({
      //  formData: fromData.split('&').reduce((a, b)=> {
      //    let [key, value] = b.split('=');
      //    a[key] = value;
      //    return a;
      //  }, {}),
      //  url: xhr.responseURL
      //});
      ////console.log('send');
      ////console.log(this);
      //console.log(arguments);
      //console.log('send');
    },
    //hook function
    open(arg,xhr){
      //console.log(arguments);
      //console.log("open called: method:%s,url:%s,async:%s",arg[0],arg[1],arg[2])
    }
  });
}




