module.exports = (passThrough, createNode) => {
  const simpleTabbing = (htmlParentNode, xmlnode) => {
    const section = createNode('section', '', {
      'data-ams-doc': xmlnode.tagName,
    });
    if (xmlnode.hasAttribute('id')) section.id = xmlnode.getAttribute('id');
    htmlParentNode.appendChild(section);
    passThrough(section, xmlnode);
  };
  return simpleTabbing;
};
