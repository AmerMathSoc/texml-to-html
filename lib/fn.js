const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const fn = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '', { role: 'doc-footnote' });
    htmlParentNode.appendChild(span);
    mapAttributes(span, xmlnode);
    passThrough(span, xmlnode);
  };
  return fn;
};
