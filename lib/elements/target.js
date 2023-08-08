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
  // NOTE: inside a "text equation" we pass it through; the tag child will pick up the ID.
  if (xmlnode.parentNode.tagName === 'disp-formula' && xmlnode.parentNode.getAttribute('content-type') === 'text') {
    this.passThrough(htmlParentNode, xmlnode);
    return;
  }
  const span = this.createNode('span');
  htmlParentNode.appendChild(span);
  mapAttributes(span, xmlnode);
  this.passThrough(span, xmlnode);
};
