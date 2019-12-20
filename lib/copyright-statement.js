module.exports = (passThrough, createNode) => {
  const copyrightStatement = (htmlParentNode, xmlnode) => {
    const isBook = xmlnode.closest('book'); // TODO extract into property or function?
    // if book
    if (isBook) {
      const p = createNode('p', '', {
        'data-ams-doc': 'book copyright'
      });
      htmlParentNode.appendChild(p);
      passThrough(p, xmlnode);
      return;
    }
    // if article
    htmlParentNode.appendChild(createNode('dt', 'Copyright Information'));
    const dd = createNode('dd', '', { 'data-ams-doc': 'copyright' });
    htmlParentNode.appendChild(dd);
    passThrough(dd, xmlnode);
  };
  return copyrightStatement;
};
