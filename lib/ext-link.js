module.exports = (passThrough, createNode) => {
  const extLink = (htmlParentNode, xmlnode) => {
    const anchor = createNode('a', '', {
      href: xmlnode.getAttribute('xlink:href')
    });
    htmlParentNode.appendChild(anchor);
    passThrough(anchor, xmlnode);
  };
  return extLink;
};
