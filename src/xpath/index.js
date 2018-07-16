class Xpath{
  constructor(element){
    this.element = element;
  }
  getParents(){
    let parents = [this.element];
    let func = function(element){
      let pn = element.parentNode;
      if(pn && pn!==document){
        parents.push(pn);
        func(pn);
      }
      return parents;
    }
    return func(this.element);
  }
  attributesToStringify(obj){
    return typeof obj === 'object' ? `${obj.name}=${obj.value}` : '';
  }
  stringify(){
    let filterReg = /^(class|id|data-selector)$/;
    return this.getParents().map(v=> {
      let attributes = v.attributes;
      attributes = Object.keys(attributes)
                      .filter(v=> filterReg.test(attributes[v].name))
                      .map(v=> this.attributesToStringify(attributes[v]));
      return v.tagName.toLowerCase() + (attributes.length>0 ? `[${attributes.join()}]`: '');
    }).reverse().join('>');
  }
  render(){
    return this.stringify().replace(/^html>body>/, '');
  }
}
export default function xpath(...arg){
  return new Xpath(...arg).render();
}
