module.exports = (passThrough, createNode) => {
  const bold = (htmlParentNode, xmlnode) => {
    if (xmlnode.closest('tex-math')) {
      htmlParentNode.insertAdjacentText('beforeend', `\\textbf{`);
      passThrough(htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      return;
    }
    const node = createNode('strong');
    htmlParentNode.appendChild(node);
    passThrough(node, xmlnode);
  };
  return bold;
};
