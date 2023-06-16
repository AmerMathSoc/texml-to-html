import { node2macro } from '../helpers/helpers-tex.js';

/**
 * bold element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, 'textbf', true]);
    return;
  }
  const node = this.createNode('strong');
  htmlParentNode.appendChild(node);
  this.passThrough(node, xmlnode);
};
