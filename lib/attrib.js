module.exports = (passThrough, createNode) => {
  const attrib = (htmlParentNode, xmlnode) => {
    let actualParent = htmlParentNode;
    if (xmlnode.parentNode.tagName === 'disp-quote') {
      const footer = createNode('footer');
      htmlParentNode.appendChild(footer);
      actualParent = footer;
    }
    if (
      xmlnode.parentNode.tagName === 'fig' ||
      xmlnode.parentNode.tagName === 'fig-group'
    ) {
      // NOTE firstElementChild should be a figcaption element (cf. caption() )
      // TODO brittle. Can we do better?
      actualParent = htmlParentNode.firstElementChild;
    }
    const span = createNode('span');
    actualParent.insertAdjacentText('beforeend', ' '); // NOTE needed inside fig-caption
    actualParent.appendChild(span);
    passThrough(span, xmlnode);
  };
  return attrib;
};
