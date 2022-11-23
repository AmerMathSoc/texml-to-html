import mapAttributes from '../helpers/mapAttributes.js';

/**
 * p element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  let paragraph = this.createNode('p');
  mapAttributes(paragraph, xmlnode);
  htmlParentNode.appendChild(paragraph);
  this.passThrough(paragraph, xmlnode);
};
