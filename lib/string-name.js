module.exports = (passThrough, createNode) => {
  const stringName = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '', {
      'data-ams-doc': 'stringname'
    });
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
  };
  return stringName;
};
