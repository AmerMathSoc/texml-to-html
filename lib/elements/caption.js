export default (passThrough, createNode) => {
  const caption = (htmlParentNode, xmlnode) => {
    const isLabel = xmlnode.tagName === 'label';
    if (
      isLabel &&
      xmlnode.nextElementSibling &&
      xmlnode.nextElementSibling.tagName === 'caption'
    ) {
      return;
    }
    const isSubfigure =
      xmlnode.parentNode.tagName === 'fig' &&
      xmlnode.parentNode.parentNode.tagName === 'fig-group';
    const previousSibling = xmlnode.previousElementSibling;
    const hasLabel = previousSibling && previousSibling.tagName === 'label';

    const figcaption = createNode('figcaption');
    htmlParentNode.appendChild(figcaption);

    if (isLabel || hasLabel) {
      const label = isLabel ? xmlnode : previousSibling;
      const strong = createNode('strong');
      figcaption.appendChild(strong);
      if (isSubfigure) strong.insertAdjacentText('afterbegin', '(');
      passThrough(strong, label);
      strong.insertAdjacentText('beforeend', isSubfigure ? ') ' : '. ');
    }
    if (isLabel) return;
    passThrough(figcaption, xmlnode);
  };
  return caption;
};
