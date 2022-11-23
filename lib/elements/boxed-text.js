import mapAttributes from '../helpers/mapAttributes.js';
import { mapColorAttributes } from '../helpers/mapColorAttributes.js';

/**
 * boxed-text element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const node = this.createNode('div', '', { 'data-ams-style': 'boxed' });
  htmlParentNode.appendChild(node);
  mapAttributes(node, xmlnode);
  mapColorAttributes(node, xmlnode);
  this.passThrough(node, xmlnode);
};
