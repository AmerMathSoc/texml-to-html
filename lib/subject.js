module.exports = (passThrough, createNode) => {
  const subject = (htmlParentNode, xmlnode) => {
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    passThrough(dd, xmlnode);
  };
  return subject;
};
