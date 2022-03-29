export default (recurseTheDom, passThrough, createNode) => {
  const contrib = (htmlParentNode, xmlnode) => {
    const contentType = xmlnode.getAttribute('contrib-type');
    // TODO (long term) One DL per contrib seems odd. Should contrib-group create a single DL around the contrib's DT+DDs?
    const dl = createNode('dl', '', {
      'data-ams-doc-contrib': contentType
    });
    htmlParentNode.appendChild(dl);

    const dt = createNode('dt', '', {
      'data-ams-doc-contrib': `${contentType} name`
    });
    dl.appendChild(dt);
    // TODO could be a name etc method
    const maybeGivenNames = xmlnode.querySelector('name>given-names');
    const maybeSurname = xmlnode.querySelector('name>surname');
    const maybeSuffix = xmlnode.querySelector('name > suffix');
    const maybeStringname = xmlnode.querySelector('string-name');
    const maybeBio = xmlnode.querySelector('bio');
    // NOTE we prefer stringname, cf. AmerMathSoc/texml#69
    if (maybeStringname) {
      recurseTheDom(dt, maybeStringname);
    }
    else if (maybeGivenNames && maybeSurname) {
      dt.innerHTML = `${maybeGivenNames.textContent}\u00A0${maybeSurname.textContent}`;
    }
    if (maybeSuffix) dt.insertAdjacentText('beforeend', (maybeSuffix.textContent[0] === ',' ? '': '\u00A0') + maybeSuffix.textContent);
    xmlnode
      .querySelectorAll('xref[ref-type="aff"]')
      .forEach(recurseTheDom.bind(null, dl));

    const emailChildren = [...xmlnode.children].filter(node=>node.tagName === 'email');
    if (emailChildren.length > 0) {
      const dd = createNode('dd');
      dl.appendChild(dd);
      emailChildren.forEach(recurseTheDom.bind(null, dd));
    }

    if (maybeBio) {
      const dd = createNode('dd', '', { 'data-ams-specific-use': 'bio'});
      dl.appendChild(dd);
      passThrough(dd, maybeBio);
    }

    recurseTheDom(dl, xmlnode.querySelector('uri'));
    xmlnode
      .querySelectorAll('contrib-id')
      .forEach(recurseTheDom.bind(null, dl));

    if (dt.nextElementSibling && dt.nextElementSibling.tagName === 'DD') return;
    // ELSE we add an empty DD to keep the HTML valid
    dl.appendChild(createNode('dd'));
  };
  return contrib;
};