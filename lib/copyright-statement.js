module.exports = (passThrough, createNode) => {
  const copyrightStatement = (htmlParentNode, xmlnode) => {
    // only called for article
    htmlParentNode.appendChild(createNode('dt', 'Copyright Information'));
    const dd = createNode('dd', '', { 'data-ams-doc': 'copyright' });
    htmlParentNode.appendChild(dd);
    passThrough(dd, xmlnode);
  };
  return copyrightStatement;
};
