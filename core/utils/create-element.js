/*
* @param {String} tagName
* @param {Object} attributes
* @param {String|Object} items
* @returns {Element}
*/
export default function createDomElement(tagName, attributes = {}, children ) {
 let element = document.createElement(tagName);

 for (let [attributeKey, attributeValue] of  Object.entries(attributes)) {
  if(attributeValue) {
    element.setAttribute(attributeKey, attributeValue)
  }
 }

 if(children){
     children.forEach(child => {
         element.appendChild(child)
     });
 }

 return element;
}