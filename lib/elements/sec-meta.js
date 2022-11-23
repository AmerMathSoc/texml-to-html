/**
 * sec-meta element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const secmetaSection = this.createNode('section', '', {
    'data-ams-doc': 'sec-meta'
  });
  htmlParentNode.appendChild(secmetaSection);
  if (!this.isBook) {
    xmlnode.children.forEach(child => {
      if (child.tagName !== 'contrib-group') {
        this.recurseTheDom(secmetaSection, child);
        return;
      }
      // NOTE could we refactor contrib-group to magically add a DL so that we just have to recurse? See also #399.
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
