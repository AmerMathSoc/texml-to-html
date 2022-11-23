/**
 * def-item element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const div = this.createNode('div');
  htmlParentNode.appendChild(div);
  this.passThrough(div, xmlnode);
};
