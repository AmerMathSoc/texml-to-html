module.exports = (recurseTheDom, createNode) => {
  const contrib = (htmlParentNode, xmlnode) => {
    const contentType = xmlnode.getAttribute('contrib-type');
    // TODO (long term) One DL per contrib seems odd. Should contrib-group create a single DL around the contrib's DT+DDs?
    const dl = createNode('dl', '', {
      'data-ams-doc-contrib': contentType
    });
    htmlParentNode.appendChild(dl);
    // TODO could be a name etc method
    dl.appendChild(
      createNode(
        'dt',
        `${xmlnode.querySelector('name>given-names').textContent}\u00A0${
          xmlnode.querySelector('name>surname').textContent
        }`,
        { 'data-ams-doc-contrib': `${contentType} name` }
      )
    );

    xmlnode
      .querySelectorAll('xref[ref-type="aff"]')
      .forEach(recurseTheDom.bind(null, dl));

    if (xmlnode.querySelector('email')) {
      const dd = createNode('dd');
      dl.appendChild(dd);
      xmlnode
        .querySelectorAll('email')
        .forEach(recurseTheDom.bind(null, dd));
    }

    recurseTheDom(dl, xmlnode.querySelector('uri'));
    xmlnode
      .querySelectorAll('contrib-id')
      .forEach(recurseTheDom.bind(null, dl));
  };
  return contrib;
};
