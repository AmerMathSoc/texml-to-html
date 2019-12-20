const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const appGroup = (htmlParentNode, xmlnode) => {
    const section = createNode('section', '', {
      role: 'doc-appendix'
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(section, xmlnode);
  };
  return appGroup;
};
