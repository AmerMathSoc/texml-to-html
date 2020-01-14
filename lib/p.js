const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const p = (htmlParentNode, xmlnode) => {
    let paragraph = createNode('p');
    if (htmlParentNode.closest('p, span[role=doc-footnote]'))
      paragraph = createNode('span', '', {
        'data-ams-doc': 'paragraph'
      });
    mapAttributes(paragraph, xmlnode);
    htmlParentNode.appendChild(paragraph);
    passThrough(paragraph, xmlnode);
  };
  return p;
};