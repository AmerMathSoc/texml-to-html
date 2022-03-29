export default function (htmlParentNode, xmlnode) {
  const nav = this.createNode('nav', '', {
    role: 'doc-toc',
    'data-ams-doc-level': '0',
    id: xmlnode.id,
  });
  htmlParentNode.appendChild(nav);
  this.recurseTheDom(nav, xmlnode.querySelector('title-group'));
  const ol = this.createNode('ol');
  nav.appendChild(ol);
  [...xmlnode.childNodes]
    .filter((node) => node.tagName === 'toc-entry')
    .forEach(this.recurseTheDom.bind(null, ol));
};
