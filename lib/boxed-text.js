const mapAttributes = require('./mapAttributes.js');
const { mapColorAttributes } = require('./mapColorAttributes.js');

module.exports = (passThrough, createNode) => {
  const boxedText = (htmlParentNode, xmlnode) => {
    const node = createNode('div', '', { 'data-ams-style': 'boxed' });
    htmlParentNode.appendChild(node);
    mapAttributes(node, xmlnode);
    mapColorAttributes(node, xmlnode);
    passThrough(node, xmlnode);
  };
  return boxedText;
};
