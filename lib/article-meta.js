module.exports = (recurseTheDom, createNode) => {
  const articleMeta = (htmlParentNode, xmlnode) => {
    const section = createNode('section', '', {
      'data-ams-doc': 'copyright-page'
    });
    htmlParentNode.appendChild(section);
    const h2 = createNode('h2', 'Article Information');
    section.appendChild(h2);
    const dl = createNode('dl');
    section.appendChild(dl);

    recurseTheDom(dl, xmlnode.querySelector('ams-meta-group'));
    recurseTheDom(dl, xmlnode.querySelector('kwd-group'));
    xmlnode
      .querySelectorAll('contrib-group')
      .forEach(recurseTheDom.bind(null, dl));
    recurseTheDom(dl, xmlnode.querySelector('funding-group'));
    recurseTheDom(dl, xmlnode.querySelector('custom-meta'));
    recurseTheDom(dl, xmlnode.parentNode.querySelector('journal-meta'));
    recurseTheDom(dl, xmlnode.querySelector('pub-date'));
    recurseTheDom(dl, xmlnode.querySelector('copyright-statement'));

    dl.appendChild(createNode('dt', 'Article References'));
    const artRefDD = createNode('dd');
    dl.appendChild(artRefDD);
    const artRefUL = createNode('ul');
    artRefDD.appendChild(artRefUL);
    xmlnode
      .querySelectorAll('self-uri')
      .forEach(recurseTheDom.bind(null, artRefUL));
    xmlnode
      .querySelectorAll('article-id')
      .forEach(recurseTheDom.bind(null, artRefUL));
    recurseTheDom(artRefUL, xmlnode.querySelector('article-citation'));
  };
  return articleMeta;
};
