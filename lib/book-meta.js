module.exports = (recurseTheDom, createNode) => {
  const bookMeta = (htmlParentNode, xmlnode) => {
    const titlepage = createNode('section', '', {
      'data-ams-doc': 'titlepage'
    });
    htmlParentNode.appendChild(titlepage);

    const bookTitleGroup = xmlnode.querySelector('book-title-group');
    if (bookTitleGroup) recurseTheDom(titlepage, bookTitleGroup);

    const publKey = xmlnode.querySelector('book-id[book-id-type="publ_key"]');
    const series = publKey ? publKey.textContent : '';
    const seriesNode = createNode('span', series, {
      'data-ams-doc': 'series'
    });
    titlepage.appendChild(seriesNode);

    const volumeKey = xmlnode.querySelector('book-volume-number');
    const volume = volumeKey ? volumeKey.textContent : '';
    const volumeNode = createNode('span', volume, {
      'data-ams-doc': 'volume'
    });
    titlepage.appendChild(volumeNode);

    const contribGroupDL = createNode('dl');
    titlepage.appendChild(contribGroupDL);
    const contribGroups = xmlnode.querySelectorAll('contrib-group');
    if (contribGroups.length > 0) contribGroups.forEach( recurseTheDom.bind(null, contribGroupDL));

    const footer = createNode('footer');
    titlepage.appendChild(footer);
    const footerDL = createNode('dl');
    footer.appendChild(footerDL);
    const footerDT = createNode('dt', 'Published by');
    footerDL.appendChild(footerDT);
    xmlnode
      .querySelectorAll('publisher')
      .forEach(recurseTheDom.bind(null, footerDL));

    const copyrightStatement = xmlnode.querySelector('copyright-statement');
    if (copyrightStatement) recurseTheDom(footer, copyrightStatement);
  };
  return bookMeta;
};
