const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const statement = (htmlParentNode, xmlnode) => {
    // NOTE doesn't use getParentLevel because statements may also appear in list items
    let ancestorWithLevel = htmlParentNode.closest('[data-ams-doc-level]');
    const ancestorLevel = ancestorWithLevel
      ? parseInt(ancestorWithLevel.getAttribute('data-ams-doc-level'))
      : 4; // NOTE Magic Number 4 because 4+1=5 below (and thus we get an h6)
    const section = createNode('section', '', {
      'data-ams-doc': 'statement',
      'data-ams-doc-level':
        htmlParentNode.getAttribute('data-ams-doc') === 'statement'
          ? ancestorLevel
          : ancestorLevel + 1
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(section, xmlnode);
  };
  return statement;
};
