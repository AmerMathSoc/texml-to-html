export default function (htmlParentNode, xmlnode) {
  const li = this.createNode('li');
  htmlParentNode.appendChild(li);
  const contentType = xmlnode.getAttribute('content-type') || '';
  const suffix = contentType === 'pdf' ? ' (PDF)' : '';
  const anchor = this.createNode('a', `Permalink${suffix}`, {
    href: xmlnode.getAttribute('xlink:href'),
    'data-ams-ref': contentType
  });
  li.appendChild(anchor);
};
