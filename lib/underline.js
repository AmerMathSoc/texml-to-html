export default (passThrough, createNode) => {
  const underline = (htmlParentNode, xmlnode) => {
    const node = createNode('u');
    htmlParentNode.appendChild(node);
    passThrough(node, xmlnode);
  };
  return underline;
};
