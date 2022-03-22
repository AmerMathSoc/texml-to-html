export default (passThrough, createNode) => {
  const articleTitle = (htmlParentNode, xmlnode) => {
    const h1 = createNode('h1');
    htmlParentNode.appendChild(h1);
    passThrough(h1, xmlnode);
  };
  return articleTitle;
};
