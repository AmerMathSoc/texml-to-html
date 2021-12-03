module.exports = (recurseTheDom, createNode) => {
  const secMeta = (htmlParentNode, xmlnode) => {
    const secmetaSection = createNode('section', '', {
      'data-ams-doc': 'sec-meta'
    });
    htmlParentNode.appendChild(secmetaSection);
    if (xmlnode.closest('article')) {
      xmlnode.children.forEach(child => {
        if (child.tagName !== 'contrib-group') {
          recurseTheDom(secmetaSection, child);
          return;
        }
        // TODO could we refactor contrib-group to magically add a DL so that we just have to recurse?
        const dl = createNode('dl');
        secmetaSection.appendChild(dl);
        recurseTheDom(dl, child);
      })
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
