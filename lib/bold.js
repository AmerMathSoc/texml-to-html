module.exports = (passThrough, createNode) => {
  const bold = (htmlParentNode, xmlnode) => {
    const node = createNode('strong');
    htmlParentNode.appendChild(node);
    passThrough(node, xmlnode);
  };
  return bold;
};
