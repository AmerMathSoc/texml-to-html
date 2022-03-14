const { replaceTeXCharactersInNodes } = require('./helpers-tex.js');

/**
 * Factory for <text> processing
 * @param {Function} passThrough - recurseTheDom's passThrough
 * @returns 
 */
module.exports = passThrough => {
  /**
   * Process <text> element
   * @param {Node} htmlParentNode 
   * @param {Node} xmlnode 
   */
  const text = (htmlParentNode, xmlnode) => {
    // NOTE currently no else as <text> only appears in <tex-math>
    if (xmlnode.closest('tex-math')) {
      replaceTeXCharactersInNodes(xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', '\\text{');
      passThrough(htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', '}');
    }
  };
  return text;
};
