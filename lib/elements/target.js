import mapAttributes from '../helpers/mapAttributes.js';

/**
 * target element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    htmlParentNode.insertAdjacentText('beforeend', `\\cssId{${xmlnode.id}}{`);
    this.passThrough(htmlParentNode, xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', `}`);
    return;
  }
  const span = this.createNode('span');
  htmlParentNode.appendChild(span);
  mapAttributes(span, xmlnode);
  this.passThrough(span, xmlnode);
};
