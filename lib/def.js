const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const def = (htmlParentNode, xmlnode) => {
    const dd = createNode('dd');
    mapAttributes(dd, xmlnode);
    htmlParentNode.appendChild(dd);
    passThrough(dd, xmlnode);
  };
  return def;
};
