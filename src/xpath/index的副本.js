import $ from 'jquery';
class Xpath{
  constructor(element, andSelf){
    this.andSelf = andSelf;
    this.element = $(element);
  }
  getParents(element){
    if(this.andSelf){
      return this.element.parents().add(this.element);
    }else{
      return this.element.parents();
    }
  }
  attributesToStringify(obj){
    return typeof obj === 'object' ? `${obj.name}=${obj.value}` : '';
  }
  stringify(){
    let that = this;
    let arr = [];
    let filterReg = /^(class|id|data-selector)$/;
    let prefix;
    this.getParents().each(function(){
      let attributes = this.attributes;
      attributes = Object.keys(attributes)
                   .filter(v=> filterReg.test(attributes[v].name))
                   .map(v=> that.attributesToStringify(attributes[v]));
      arr.push(this.tagName.toLowerCase() + (attributes.length>0 ? `[${attributes.join()}]`: '') );
    });
    return this.andSelf ? arr.join('>') : arr.reverse().join('>');
  }
  render(){
    return this.stringify().replace(/^html>body>/, '');
  }
}
export default function xpath(...arg){
  return new Xpath(...arg).render();
}
