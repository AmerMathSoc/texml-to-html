/**
 * caption element; also used for label element (when inside fig, table etc. - cf. label.js)
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
 export default function (htmlParentNode, xmlnode) {
  const isLabel = xmlnode.tagName === 'label';
  if (
    isLabel &&
    xmlnode.nextElementSibling &&
    xmlnode.nextElementSibling.tagName === 'caption'
  ) {
    return;
  }
  const isSubfigure =
    (xmlnode.parentNode.tagName === 'fig' &&
    xmlnode.parentNode.parentNode.tagName === 'fig-group') ||
    (xmlnode.parentNode.tagName === 'table-wrap' &&
    xmlnode.parentNode.parentNode.tagName === 'table-wrap-group') ;
  const previousSibling = xmlnode.previousElementSibling;
  const hasLabel = previousSibling && previousSibling.tagName === 'label';

  const figcaption = this.createNode('figcaption');
  htmlParentNode.appendChild(figcaption);

  if (isLabel || hasLabel) {
    const label = isLabel ? xmlnode : previousSibling;
    const strong = this.createNode('strong');
    figcaption.appendChild(strong);
    if (isSubfigure) strong.insertAdjacentText('afterbegin', '(');
    this.passThrough(strong, label);
    strong.insertAdjacentText('beforeend', isSubfigure ? ') ' : '. ');
  }
  if (isLabel) return;
  this.passThrough(figcaption, xmlnode);
};
