module.exports = (recurseTheDom, createNode) => {
  const toc = (htmlParentNode, xmlnode) => {
    const nav = createNode('nav', '', {
      role: 'doc-toc',
      'data-ams-doc-level': '0'
    });
    htmlParentNode.appendChild(nav);
    recurseTheDom(nav, xmlnode.querySelector('title-group'));
    const ol = createNode('ol');
    nav.appendChild(ol);
    [...xmlnode.childNodes]
      .filter(node => node.tagName === 'toc-entry')
      .forEach(recurseTheDom.bind(null, ol));
  };
  return toc;
};
