import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

/**
 * bold element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    htmlParentNode.insertAdjacentText('beforeend', `\\textbf{`);
    replaceTeXCharactersInNodes(xmlnode);
    this.passThrough(htmlParentNode, xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', `}`);
    return;
  }
  const node = this.createNode('strong');
  htmlParentNode.appendChild(node);
  this.passThrough(node, xmlnode);
};
