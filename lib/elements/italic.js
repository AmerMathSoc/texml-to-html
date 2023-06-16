import { node2macro } from '../helpers/helpers-tex.js';

/**
 * italic element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, 'textit', true]);
    return;
  }
  const tagname = xmlnode.getAttribute('toggle') === 'yes' ? 'em' : 'i';
  const node = this.createNode(tagname);
  htmlParentNode.appendChild(node);
  this.passThrough(node, xmlnode);
};
