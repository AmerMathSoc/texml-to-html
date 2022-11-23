/**
 * subject element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  this.passThrough(dd, xmlnode);
};
