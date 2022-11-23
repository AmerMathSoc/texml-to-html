/**
 * funding-group element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  htmlParentNode.appendChild(this.createNode('dt', 'Additional Notes'));
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  this.passThrough(dd, xmlnode);
};
