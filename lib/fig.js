module.exports = (passThrough, createNode) => {
  const fig = (htmlParentNode, xmlnode) => {
    const figure = createNode('figure', '', {
      'data-ams-position': xmlnode.getAttribute('position'),
      'data-ams-doc': xmlnode.tagName
    });
    if (xmlnode.hasAttribute('id')) figure.id = xmlnode.getAttribute('id');
    htmlParentNode.appendChild(figure);
    passThrough(figure, xmlnode);
  };
  return fig;
};
