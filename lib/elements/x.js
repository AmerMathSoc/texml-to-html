export default function (htmlParentNode, xmlnode) {
    // ignore if not xref/x or isBook
    if (xmlnode.parentNode.tagName !== 'xref' && xmlnode.closest('article'))
      return;
    this.passThrough(htmlParentNode, xmlnode);
  };
