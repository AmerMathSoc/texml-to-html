/**
 * moves links into subsequent span
 * @param {Function} recurseTheDom 
 * @param {Function} createNode 
 * @param {Node} xmlnode  XML DOM node
 * @param {Node} htmlnode HTML Dom Node
 * @param {Node} linkChild XML Dom Node, child of xmlnode
 * @returns {Boolean} 
 */
exports.unnestLinks = (recurseTheDom, createNode, xmlnode, htmlnode, linkChild) => {
    const siblings = [...xmlnode.childNodes];
    const precedingSiblings = siblings.slice(0, siblings.indexOf(linkChild));
    const followingSiblings = siblings.slice(siblings.indexOf(linkChild));
    const span = createNode('span');
    htmlnode.insertAdjacentElement('afterend', span);
    precedingSiblings.forEach(recurseTheDom.bind(null, htmlnode));
    followingSiblings.forEach(recurseTheDom.bind(null, span));
}
