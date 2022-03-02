
/**
 * Re-escape active TeX characters inside text node (since we create TeX input for mathjax from <text> elements)
 * @param {Text} textNode 
 */
const replaceTeXCharactersInNode = textNode => {
  const regExp = /([#$])/g;
  textNode.textContent = textNode.textContent.replace(regExp, '\\$1');
}

/**
 * Runs replaceTeXCharactersInNode on all text node (direct) children
 * @param {Node} xmlnode 
 */
const replaceTeXCharactersInNodes = (xmlnode) => {
  const textChildren = [...xmlnode.childNodes].filter(node => node.nodeType === 3);
  textChildren.forEach(replaceTeXCharactersInNode)
}

/**
 * Wraps tex-math elements inside the text node in $ (since tex-math will be passed-through later)
 * @param {Node} xmlnode 
 */
const wrapNestedMathInDollar = xmlnode => {
  [...xmlnode.children].filter(node => node.tagName === 'inline-formula').forEach(texMath => {
    texMath.insertAdjacentText('beforebegin', '$');
    texMath.insertAdjacentText('afterend', '$');
  })
}

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
      wrapNestedMathInDollar(xmlnode); // NOTE must run AFTER replaceTeXCharactersInNodes() so that the added $'s are not escaped
      htmlParentNode.insertAdjacentText('beforeend', '\\text{');
      passThrough(htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', '}');
    }
  };
  return text;
};
