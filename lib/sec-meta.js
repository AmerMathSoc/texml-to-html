module.exports = (recurseTheDom, createNode) => {
  const secMeta = (htmlParentNode, xmlnode) => {
    const secmetaSection = createNode('section', '', {
      'data-ams-doc': 'sec-meta'
    });
    htmlParentNode.appendChild(secmetaSection);
    if (xmlnode.closest('article')) {
      const dl = createNode('dl');
      secmetaSection.appendChild(dl);
      recurseTheDom(dl, xmlnode.querySelector('contrib-group'));
    } else {
      // isBook
      recurseTheDom(
        secmetaSection,
        xmlnode.querySelector('contrib-group')
      );
    }
    recurseTheDom(
      secmetaSection,
      xmlnode.querySelector('abstract')
    );
  };
  return secMeta;
};
