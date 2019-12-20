module.exports = (passThrough, createNode) => {
  const bookTitle = (htmlParentNode, xmlnode) => {
    const heading = createNode('h1');
    htmlParentNode.appendChild(heading);
    passThrough(heading, xmlnode);
  };

  return bookTitle;
};
