export default function (htmlParentNode, xmlnode) {
  const secmetaSection = this.createNode('section', '', {
    'data-ams-doc': 'sec-meta'
  });
  htmlParentNode.appendChild(secmetaSection);
  if (xmlnode.closest('article')) {
    xmlnode.children.forEach(child => {
      if (child.tagName !== 'contrib-group') {
        this.recurseTheDom(secmetaSection, child);
        return;
      }
      // TODO could we refactor contrib-group to magically add a DL so that we just have to recurse?
      const dl = this.createNode('dl');
      secmetaSection.appendChild(dl);
      this.recurseTheDom(dl, child);
    })
  } else {
    // isBook
    this.recurseTheDom(
      secmetaSection,
      xmlnode.querySelector('contrib-group')
    );
  }
  this.recurseTheDom(
    secmetaSection,
    xmlnode.querySelector('abstract')
  );
};
