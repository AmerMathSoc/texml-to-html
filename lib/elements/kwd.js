/**
 * kwd element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const li = this.createNode('li');
  htmlParentNode.appendChild(li);
  this.passThrough(li, xmlnode);
};
