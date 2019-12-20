module.exports = (passThrough, createNode) => {
  const kwd = (htmlParentNode, xmlnode) => {
    const li = createNode('li');
    htmlParentNode.appendChild(li);
    passThrough(li, xmlnode);
  };
  return kwd;
};
