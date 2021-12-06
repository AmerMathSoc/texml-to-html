const { mapColorAttributes } = require('./mapColorAttributes.js');

module.exports = (passThrough, createNode) => {
  const styledContent = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '');
    // handle style-type NOTE current values: sans-serif, oblique
    if (xmlnode.hasAttribute('style-type')) span.setAttribute('data-ams-style', xmlnode.getAttribute('style-type'));
    // handle color attributes
    mapColorAttributes(span, xmlnode);
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
  };
  return styledContent;
};
