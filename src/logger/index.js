//import db from '../db';
import page from './page';
import ajaxError from './ajax-error';
import gc from './gc';
import jsError from './js-error';
import xpath from '../xpath';
import config from '../config';
import LZString from 'lz-string';

class Logger{
  constructor(){
    this.ajaxData = [];
    this.clickData = [];
  }
  ajaxError(xhr){
    this.send('ajaxError', {...page(), click: this.clickData, ...ajaxError(xhr)});
  }
  jsError(...arg){
    this.send('jsError', {...page(), click: this.clickData, ...jsError(...arg)});
  }
  ajax({url, method}){
    config.jsWhiteList.some(v=> {
      if(typeof v === 'function'){
        
      }
    });
    this.ajaxData.push({url, method, time: Date.now()});
    gc('ajax', this.ajaxData);
  }  
  click(event){
    this.clickData.push({xpath: xpath(event.target), time: Date.now()});
    gc('click', this.clickData);
  }
  custom(json={}){        //
    this.send(json);
  }
  send(type, json){
    json.time = Date.now();
    let _sendCallback = config.send(type, json);
    if(_sendCallback===false){
      return;
    }else if(_sendCallback){
      json = _sendCallback
    }
    console.log(JSON.stringify(json).length);
    //console.log(LZString.compress(JSON.stringify(json)).length);
  }
  save(){
    //..
  }
}

export default function logger(){
  let {namespace} = config;
  let _logger;
  window[namespace] = window[namespace] || {};

  if(!window[namespace].logger){
    _logger = new Logger();
    window[namespace].logger = _logger;
  }else{
    _logger = window[namespace].logger;
  }
  return _logger;
}

