export default passThrough => {
  const x = (htmlParentNode, xmlnode) => {
    // ignore if not xref/x or isBook
    if (xmlnode.parentNode.tagName !== 'xref' && xmlnode.closest('article'))
      return;
    passThrough(htmlParentNode, xmlnode);
  };
  return x;
};
