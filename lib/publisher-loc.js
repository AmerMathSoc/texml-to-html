module.exports = (passThrough, createNode) => {
  const publisherLoc = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '');
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
  };
  return publisherLoc;
};
