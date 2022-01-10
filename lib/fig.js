const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const fig = (htmlParentNode, xmlnode) => {
    const figure = createNode('figure', '', {
      'data-ams-doc': xmlnode.tagName
    });
    if (xmlnode.getAttribute('position')) figure.setAttribute('data-ams-position', xmlnode.getAttribute('position'));
    mapAttributes(figure, xmlnode);
    htmlParentNode.appendChild(figure);
    passThrough(figure, xmlnode);
  };
  return fig;
};
