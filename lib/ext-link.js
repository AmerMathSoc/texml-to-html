const unnestLinks = require('./unnest.js').unnestLinks;

module.exports = (recurseTheDom, passThrough, createNode) => {
  const extLink = (htmlParentNode, xmlnode) => {
    const anchor = createNode('a', '', {
      href: xmlnode.getAttribute('xlink:href')
    });
    htmlParentNode.appendChild(anchor);
    // handle nested links
    const linkChild = xmlnode.childNodes.find(node => node.tagName === 'xref' || node.tagName === 'ext-link');
    if (linkChild) unnestLinks(recurseTheDom, createNode, xmlnode, anchor, linkChild)
    else passThrough(anchor, xmlnode);
  };
  return extLink;
};
