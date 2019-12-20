module.exports = (passThrough, createNode) => {
  const styledContent = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '', {
      'data-ams-style': xmlnode.getAttribute('style-type')
    });
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
  };
  return styledContent;
};
