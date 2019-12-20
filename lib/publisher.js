module.exports = (passThrough, createNode) => {
  const publisher = (htmlParentNode, xmlnode) => {
    // only used in books
    const dd = createNode('dd', '', {
      'data-ams-doc': 'book publisher'
    });
    htmlParentNode.appendChild(dd);
    passThrough(dd, xmlnode);
  };
  return publisher;
};
