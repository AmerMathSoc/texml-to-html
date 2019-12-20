module.exports = createNode => {
  const selfUri = (htmlParentNode, xmlnode) => {
    const li = createNode('li');
    htmlParentNode.appendChild(li);
    const contentType = xmlnode.getAttribute('content-type') || '';
    const suffix = contentType === 'pdf' ? ' (PDF)' : '';
    const anchor = createNode('a', `Permalink${suffix}`, {
      href: xmlnode.getAttribute('xlink:href'),
      'data-ams-ref': contentType
    });
    li.appendChild(anchor);
  };
  return selfUri;
};
