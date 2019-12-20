const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const target = (htmlParentNode, xmlnode) => {
    const span = createNode('span');
    htmlParentNode.appendChild(span);
    mapAttributes(span, xmlnode);
    passThrough(span, xmlnode);
  };
  return target;
};
