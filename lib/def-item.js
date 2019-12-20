module.exports = (passThrough, createNode) => {
  const defItem = (htmlParentNode, xmlnode) => {
    const isBook = xmlnode.closest('book');
    if (isBook) {
      passThrough(htmlParentNode, xmlnode);
      return;
    }
    const div = createNode('div');
    htmlParentNode.appendChild(div);
    passThrough(div, xmlnode);
  };
  return defItem;
};
