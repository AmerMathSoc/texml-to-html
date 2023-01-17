/**
 * compound-kwd element
 * NOTE: left in document because compound-kwd-part[content-type="text"] can contain tex-math
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const li = this.createNode('li', '', { 'data-msc-role': xmlnode.getAttribute('content-type'), 'data-msc-key': xmlnode.querySelector('compound-kwd-part[content-type="code"]').textContent });
  htmlParentNode.appendChild(li);
  this.passThrough(li, xmlnode.querySelector('compound-kwd-part[content-type="text"]'));
};
