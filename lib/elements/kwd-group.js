/**
 * kwd-group element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // NOTE: we have only 2 types of kwd-group elements 
  // - with @vocab (MSC 2010/20)
  // - with @type="author" (keywords)
  const list = this.createNode('ul', '', { 'data-ams-doc': xmlnode.getAttribute('vocab') || 'keywords' });
  htmlParentNode.appendChild(list);
  this.passThrough(list, xmlnode);
};
