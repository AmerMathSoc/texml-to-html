/**
 * tex-math element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // nested tex-math: unwrapped but with $...$
  if (xmlnode.parentNode.closest('tex-math')) {
    htmlParentNode.insertAdjacentText('beforeend', '$');
    this.passThrough(htmlParentNode, xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', '$');
    return; // NOTE should only occur in implicit text mode (\tag{} // <tag /> etc) or within <text> elements (which are not JATS/BITS and thus occur nowhere else)
}
  // Otherwise we copy and pass-through
  const element = this.createNode('tex-math');
  htmlParentNode.appendChild(element);
  this.passThrough(element, xmlnode);
};
