import mapAttributes from '../helpers/mapAttributes.js';

/**
 * term element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const dt = this.createNode('dt');
  mapAttributes(dt, xmlnode);
  // NOTE DT gets id from def-item; cf. def-item.js
  dt.setAttribute('id', xmlnode.parentNode.id);
  htmlParentNode.appendChild(dt);
  this.passThrough(dt, xmlnode);
};
