module.exports = (passThrough, createNode) => {
  const defItem = (htmlParentNode, xmlnode) => {
    const div = createNode('div');
    htmlParentNode.appendChild(div);
    passThrough(div, xmlnode);
  };
  return defItem;
};
