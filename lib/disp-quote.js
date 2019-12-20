module.exports = (passThrough, createNode) => {
  const dispQuote = (htmlParentNode, xmlnode) => {
    const blockquote = createNode('blockquote', '', {
      'data-ams-style': xmlnode.getAttribute('specific-use')
    });
    if (htmlParentNode.tagName === 'P')
      htmlParentNode.insertAdjacentElement('afterend', blockquote);
    else htmlParentNode.appendChild(blockquote);
    passThrough(blockquote, xmlnode);
  };
  return dispQuote;
};
