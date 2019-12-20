module.exports = (passThrough, createNode) => {
  const bookTitleGroup = (htmlParentNode, xmlnode) => {
    const header = createNode('header');
    htmlParentNode.appendChild(header);
    passThrough(header, xmlnode);
  };

  return bookTitleGroup;
};
