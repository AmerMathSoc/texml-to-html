module.exports = (passThrough, createNode) => {
  const tagToDataStyle = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '', {
      'data-ams-style': xmlnode.tagName
    });
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
  };
  ;
  return tagToDataStyle;
};
