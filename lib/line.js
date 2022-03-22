export default (passThrough, createNode) => {
  const line = (htmlParentNode, xmlnode) => {
    const paragraph = createNode('p', '', {
      'data-ams-doc': xmlnode.tagName,
    });
    if (xmlnode.hasAttribute('id')) paragraph.id = xmlnode.getAttribute('id');
    if (xmlnode.hasAttribute('indent'))
    paragraph.setAttribute('data-ams-indent', xmlnode.getAttribute('indent'));
    htmlParentNode.appendChild(paragraph);
    passThrough(paragraph, xmlnode);
  };
  return line;
};
