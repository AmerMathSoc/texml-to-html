/**
 * x element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // ignore if not xref/x or isBook
  if (!['xref', 'xref-group'].includes(xmlnode.parentNode.tagName) && xmlnode.closest('article'))
    return;
  this.passThrough(htmlParentNode, xmlnode);
};
