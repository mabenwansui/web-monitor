import $ from 'jquery';
import xpath from '../xpath';

/*
  方法
  observer
  pageInit
*/

export default class DomMonitor{
  pageDom(){
    return $('html')[0].outerHTML;
    //.replace(/[\r\n]/igm, '').replace(/\s{2}/gm, '');
  }
  addNode(record){
    let nodes = [...record.addedNodes];
    return nodes.map(v=> 
      ({
        type: 'addNode',
        //prev: (record.previousSibling && record.previousSibling.outerHTML) || '',
        timeStamp: Date.now(),
        dom: v.outerHTML,
        xpath: xpath($(v))        
      })
    )[0];
  }
  removedNode(record){
    let nodes = [...record.removedNodes];
    return nodes.map(v=> 
      ({
        type: 'removedNode',
        //prev: (record.previousSibling && record.previousSibling.previousElementSibling && record.previousSibling.previousElementSibling.outerHTML) || '',
        timeStamp: Date.now(),
        dom: v.outerHTML,
        xpath: xpath($(record.target), true)        
      })
    )[0];
  }
  attribute(record){
    let attr = record.target.attributes[record.attributeName];
    return {
      type: 'attributes',
      timeStamp: Date.now(),
      attr: `${attr.name}=${attr.value}`,
      xpath: xpath($(record.target), true)
    }
  }
  filter(obj){
    if(obj.xpath.indexOf('loadingui')>-1){
      return false
    }else{
      return true;
    }
  }
  observer() {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    let result;
    new MutationObserver(mutationRecord=>{ //构造函数回调
      mutationRecord.forEach( record=> {
        switch(record.type){
          case 'childList':
            if(record.addedNodes.length>0){
              result = this.addNode(record);
              if(this.filter(result)){
                console.log(result);
              }
            }
            if(record.removedNodes.length>0){
              result = this.removedNode(record);
              if(this.filter(result)){
                console.log(result);
              }
            }
            break;
          case 'attributes':
            result = this.attribute(record);
            if(this.filter(result)){
              console.log(result);
            }
            break;
          default:
            break;
        }
      });
    }).observe(document.body, {
      attributes: true, 
      characterData: true,
      childList: true,
      subtree: true
    });
  }
}

