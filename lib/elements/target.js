import mapAttributes from '../helpers/mapAttributes.js';
import { node2macro } from '../helpers/helpers-tex.js';

/**
 * target element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, `cssId{${xmlnode.id}}`, false]);
    return;
  }
  const span = this.createNode('span');
  htmlParentNode.appendChild(span);
  mapAttributes(span, xmlnode);
  this.passThrough(span, xmlnode);
};
