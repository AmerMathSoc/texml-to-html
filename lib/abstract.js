const mapAttributes = require('./mapAttributes');
const getParentLevel = require('./getParentLevel');

module.exports = (passThrough, createNode) => {
  const abstract = (htmlParentNode, xmlnode) => {
    const level = getParentLevel(htmlParentNode) || '1'; // NOTE in articles, we don't have a disp-level in the XML; also NOTE that this is a change from xslt which erroneously had hardcoded 1 but abstract/title still got an h2
    const section = createNode('section', '', {
      'data-ams-doc-level': level,
      role: 'doc-abstract'
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(section, xmlnode);
  };
  return abstract;
};