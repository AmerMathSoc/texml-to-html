module.exports = (passThrough) => {
  const x = (htmlParentNode, xmlnode) => {
    if (xmlnode.parentNode.tagName !== 'xref') return;
    passThrough(htmlParentNode, xmlnode);
  };
  return x;
};
