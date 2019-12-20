const mapAttributes = require('./mapAttributes');
const getParentLevel = require('./getParentLevel');

module.exports = (passThrough, createNode) => {
  const statement =  (htmlParentNode, xmlnode) => {
    const section = createNode('section', '', {
      'data-ams-doc': 'statement',
      'data-ams-doc-level':
        htmlParentNode.getAttribute('data-ams-doc') === 'statement'
          ? getParentLevel(htmlParentNode)
          : getParentLevel(htmlParentNode) + 1
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(section, xmlnode);
  };
  return statement;
};
