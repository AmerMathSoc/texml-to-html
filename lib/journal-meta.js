module.exports = (createNode) => {
  const journalMeta = (htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(
      createNode('dt', 'Journal Information')
    );
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    // TODO refactor into methods (cf. journal/article-meta handling in titlepage)
    dd.appendChild(
      createNode(
        'a',
        xmlnode.querySelector('journal-title-group>journal-title').textContent,
        { href: xmlnode.querySelector('self-uri').getAttribute('xlink:href') }
      )
    );
    dd.insertAdjacentText('beforeend',', ');
    const volume = xmlnode.parentNode.querySelector('article-meta>volume');
    dd.appendChild(
      createNode(
        'span',
        `Volume ${
          volume ? volume.textContent : ''
        }`
      )
    );
    dd.insertAdjacentText('beforeend',', ');
    const issue = xmlnode.parentNode.querySelector('article-meta>issue');
    dd.appendChild(
      createNode(
        'span',
        `Issue ${
          issue ? issue.textContent : ''
        }`
      )
    );
    dd.insertAdjacentText('beforeend',', ISSN ');
    dd.appendChild(
      createNode(
        'span',
        `${xmlnode.querySelector('journal-title-group>issn').textContent}`
      )
    );
    dd.insertAdjacentText('beforeend',', published by the ');
    dd.appendChild(
      createNode(
        'span',
        `${xmlnode.querySelector('publisher>publisher-name').textContent}`
      )
    );
    dd.insertAdjacentText('beforeend',', ');
    dd.appendChild(
      createNode(
        'span',
        `${xmlnode.querySelector('publisher>publisher-loc').textContent}`
      )
    );
    dd.insertAdjacentText('beforeend','.');
  };
  return journalMeta;
};
