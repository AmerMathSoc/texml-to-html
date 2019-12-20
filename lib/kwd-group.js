module.exports = (passThrough, createNode) => {
  const kwdGroup = (htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(createNode('dt', 'Keywords'));
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    const ul = createNode('ul');
    dd.appendChild(ul);
    passThrough(ul, xmlnode);
  };
  return kwdGroup;
};
