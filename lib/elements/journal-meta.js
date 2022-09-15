export default function (htmlParentNode, xmlnode) {
  htmlParentNode.appendChild(this.createNode('dt', 'Journal Information'));
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  // TODO refactor into methods (cf. journal/article-meta handling in titlepage)
  const journalTitleNode = xmlnode.querySelector(
    'journal-title-group>journal-title'
  );
  const selfUriNode = xmlnode.querySelector('self-uri');
  dd.appendChild(
    this.createNode('a', journalTitleNode ? journalTitleNode.textContent : '', {
      href: selfUriNode ? selfUriNode.getAttribute('xlink:href') : '',
    })
  );
  dd.insertAdjacentText('beforeend', ', ');
  const volume = xmlnode.parentNode.querySelector('article-meta>volume');
  dd.appendChild(
    this.createNode('span', `Volume ${volume ? volume.textContent : ''}`)
  );
  dd.insertAdjacentText('beforeend', ', ');
  const issue = xmlnode.parentNode.querySelector('article-meta>issue');
  dd.appendChild(
    this.createNode('span', `Issue ${issue ? issue.textContent : ''}`)
  );
  dd.insertAdjacentText('beforeend', ', ISSN ');
  const issnNode = xmlnode.querySelector('journal-meta>issn, journal-title-group>issn'); // TODO cf. #386 remove `journal-title-group>issn` after texml#146 roll-out
  dd.appendChild(
    this.createNode('span', `${issnNode ? issnNode.textContent : ''}`)
  );
  dd.insertAdjacentText('beforeend', ', published by the ');
  const publisherNameNode = xmlnode.querySelector('publisher>publisher-name');
  dd.appendChild(
    this.createNode(
      'span',
      `${publisherNameNode ? publisherNameNode.textContent : ''}`
    )
  );
  dd.insertAdjacentText('beforeend', ', ');
  const publisherLocNode = xmlnode.querySelector('publisher>publisher-loc');
  dd.appendChild(
    this.createNode(
      'span',
      `${publisherLocNode ? publisherLocNode.textContent : ''}`
    )
  );
  dd.insertAdjacentText('beforeend', '.');
};
