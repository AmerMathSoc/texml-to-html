module.exports = (passThrough, createNode) => {
  const italic = (htmlParentNode, xmlnode) => {
    const tagname = xmlnode.getAttribute('toggle') === 'yes' ? 'em' : 'i';
    const node = createNode(tagname);
    htmlParentNode.appendChild(node);
    passThrough(node, xmlnode);
  };
  return italic;
};
