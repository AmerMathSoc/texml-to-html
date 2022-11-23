import mapAttributes from '../helpers/mapAttributes.js';

/**
 * def element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const dd = this.createNode('dd');
  mapAttributes(dd, xmlnode);
  htmlParentNode.appendChild(dd);
  this.passThrough(dd, xmlnode);
};
