const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const app = (htmlParentNode, xmlnode) => {
    const isBook = xmlnode.closest('book'); // TODO extract into property or function?
    const section = createNode('section', '', {
      role: 'doc-appendix',
      'data-ams-doc-level': isBook ? 0 : 1
    });
    htmlParentNode.appendChild(section);
    mapAttributes(section, xmlnode);
    passThrough(section, xmlnode);
  };
  return app;
};
