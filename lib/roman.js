const { replaceTeXCharactersInNodes } = require('./helpers-tex.js');

module.exports = (passThrough, createNode) => {
  const roman = (htmlParentNode, xmlnode) => {
    if (xmlnode.closest('tex-math')) {
      htmlParentNode.insertAdjacentText('beforeend', `\\textrm{`);
      replaceTeXCharactersInNodes(xmlnode);
      passThrough(htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      return;
    }
    const span = createNode('span', '', {
      'data-ams-style': xmlnode.tagName
    });
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
  };
  ;
  return roman;
};
