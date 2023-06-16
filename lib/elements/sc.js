import { node2macro } from '../helpers/helpers-tex.js';

/**
 * sc element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, 'mathsc', true, true]);
    return;
  }

  const span = this.createNode('span', '', {
    'data-ams-style': xmlnode.tagName
  });
  htmlParentNode.appendChild(span);
  this.passThrough(span, xmlnode);
};
