module.exports = (passThrough, createNode) => {
  const fig = (htmlParentNode, xmlnode) => {
    const figure = createNode('figure', '', {
      role: 'group',
      id: xmlnode.getAttribute('id'),
      'data-ams-position': xmlnode.getAttribute('position'),
      'data-ams-doc': xmlnode.tagName
    });
    htmlParentNode.appendChild(figure);
    passThrough(figure, xmlnode);
  };
  return fig;
};
