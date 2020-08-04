module.exports = (passThrough, createNode) => {
  const dispQuote = (htmlParentNode, xmlnode) => {
    const specificUse = xmlnode.getAttribute('specific-use');
    const blockquote = createNode('blockquote');
    if (specificUse === 'epigraph')
      blockquote.setAttribute('role', 'doc-epigraph');
    else blockquote.setAttribute('data-ams-style', specificUse);
    if (htmlParentNode.tagName === 'P')
      htmlParentNode.insertAdjacentElement('afterend', blockquote);
    else htmlParentNode.appendChild(blockquote);
    passThrough(blockquote, xmlnode);
  };
  return dispQuote;
};
