/**
 * funding-group element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const div = this.createNode('div', '', { 'data-ams-doc': 'funding-group' });
  htmlParentNode.appendChild(div);
  this.passThrough(div, xmlnode);
};
