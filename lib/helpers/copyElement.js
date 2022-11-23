import mapAttributes from '../helpers/mapAttributes.js';

/**
 * Creates a (limited) copy of the element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const copy = this.createNode(xmlnode.tagName);
  htmlParentNode.appendChild(copy);
  mapAttributes(copy, xmlnode);
  this.passThrough(copy, xmlnode);
};
