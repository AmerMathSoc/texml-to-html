module.exports = (passThrough, createNode) => {
  const boxedText = (htmlParentNode, xmlnode) => {
    const node = createNode('div', '', { 'data-ams-style': 'boxed' });
    htmlParentNode.appendChild(node);
    passThrough(node, xmlnode);
  };
  return boxedText;
};
