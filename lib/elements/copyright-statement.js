/**
 * copyright-statement element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // only called for article
  htmlParentNode.appendChild(this.createNode('dt', 'Copyright Information'));
  const dd = this.createNode('dd', '', { 'data-ams-doc': 'copyright' });
  htmlParentNode.appendChild(dd);
  this.passThrough(dd, xmlnode);
};
