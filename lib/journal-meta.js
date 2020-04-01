module.exports = (createNode) => {
  const journalMeta = (htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(createNode('dt', 'Journal Information'));
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    // TODO refactor into methods (cf. journal/article-meta handling in titlepage)
    const journalTitleNode = xmlnode.querySelector(
      'journal-title-group>journal-title'
    );
    const selfUriNode = xmlnode.querySelector('self-uri');
    dd.appendChild(
      createNode('a', journalTitleNode ? journalTitleNode.textContent : '', {
        href: selfUriNode ? selfUriNode.getAttribute('xlink:href') : '',
      })
    );
    dd.insertAdjacentText('beforeend', ', ');
    const volume = xmlnode.parentNode.querySelector('article-meta>volume');
    dd.appendChild(
      createNode('span', `Volume ${volume ? volume.textContent : ''}`)
    );
    dd.insertAdjacentText('beforeend', ', ');
    const issue = xmlnode.parentNode.querySelector('article-meta>issue');
    dd.appendChild(
      createNode('span', `Issue ${issue ? issue.textContent : ''}`)
    );
    dd.insertAdjacentText('beforeend', ', ISSN ');
    const issnNode = xmlnode.querySelector('journal-title-group>issn');
    dd.appendChild(
      createNode('span', `${issnNode ? issnNode.textContent : ''}`)
    );
    dd.insertAdjacentText('beforeend', ', published by the ');
    const publisherNameNode = xmlnode.querySelector('publisher>publisher-name');
    dd.appendChild(
      createNode(
        'span',
        `${publisherNameNode ? publisherNameNode.textContent : ''}`
      )
    );
    dd.insertAdjacentText('beforeend', ', ');
    const publisherLocNode = xmlnode.querySelector('publisher>publisher-loc');
    dd.appendChild(
      createNode(
        'span',
        `${publisherLocNode ? publisherLocNode.textContent : ''}`
      )
    );
    dd.insertAdjacentText('beforeend', '.');
  };
  return journalMeta;
};
