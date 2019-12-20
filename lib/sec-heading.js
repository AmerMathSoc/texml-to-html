module.exports = (passThrough, createNode) => {
  const secHeading = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '', {
      'data-ams-doc': 'secheading'
    });
    htmlParentNode.appendChild(span);
    const label = xmlnode.querySelector('label');
    const title = xmlnode.querySelector('title');
    if (label) {
      passThrough(span, label);
    }
    if (title && label) {
      span.insertAdjacentText('beforeend', '. ');
      // TODO his does not match label/title punctuation where a title without label would get a period.
    }
    passThrough(span, title);
  };
  return secHeading;
};
