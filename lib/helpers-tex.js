/**
 * Re-escape active TeX characters inside text node (since we create TeX input for mathjax from <text> elements)
 * @param {Text} textNode 
 */
const replaceTeXCharactersInNode = textNode => {
    const regExp = /([#$_~])/g;
    textNode.textContent = textNode.textContent.replace(regExp, '\\$1');
}

/**
 * Runs replaceTeXCharactersInNode on all text node (direct) children
 * @param {Node} xmlnode 
 */
exports.replaceTeXCharactersInNodes = (xmlnode) => {
    const textChildren = [...xmlnode.childNodes].filter(node => node.nodeType === 3);
    textChildren.forEach(replaceTeXCharactersInNode)
}
