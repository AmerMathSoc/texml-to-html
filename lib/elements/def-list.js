import mapAttributes from '../helpers/mapAttributes.js';

/**
 * def-list element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const dl = this.createNode('dl');
  mapAttributes(dl, xmlnode);
  // NOTE DOM let's us insert DL in p, which is invalid
  htmlParentNode.appendChild(dl);
  this.passThrough(dl, xmlnode);
};
