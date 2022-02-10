module.exports = (recurseTheDom, passThrough, createNode) => {
  const article = (htmlParentNode, xmlnode) => {
    const section = createNode('section', '', {
      'data-ams-doc': 'titlepage',
    });
    htmlParentNode.appendChild(section);
    const journalId = xmlnode.querySelector(
      'journal-id[journal-id-type="publisher"]'
    );
    const manuscriptId = xmlnode.querySelector(
      'article-id[pub-id-type="manuscript"]'
    );
    if (journalId && manuscriptId)
      section.setAttribute(
        'data-ams-manid',

        journalId.textContent.trim() + manuscriptId.textContent.trim()
      );
    const header = createNode('header');
    section.appendChild(header);
    const journalInfo = createNode('aside', '', {
      'data-ams-doc': 'journal',
    });
    header.appendChild(journalInfo);
    // TODO journal information seems to get removed in ams-html. Drop it here and update ams-html.
    const journalTitleNode = xmlnode.querySelector(
      'front>journal-meta>journal-title-group>journal-title'
    );
    const journalTitle = createNode(
      'p',
      journalTitleNode ? journalTitleNode.textContent : '',
      { 'data-ams-doc': 'journal title' }
    ); // NOTE no recursion (matches xslt)
    journalInfo.appendChild(journalTitle);
    const journalLocation = createNode('p', '', {
      'data-ams-doc': 'journal location',
    });
    journalInfo.appendChild(journalLocation);
    const volume = xmlnode.querySelector('front>article-meta>volume');
    journalLocation.appendChild(
      createNode('span', `Volume ${volume ? volume.textContent : ''}, `, {
        'data-ams-doc': 'journal volume',
      })
    );
    const issue = xmlnode.querySelector('front>article-meta>issue');
    journalLocation.appendChild(
      createNode('span', `Issue ${issue ? issue.textContent : ''}`, {
        'data-ams-doc': 'journal issue',
      })
    );
    const journalDateNode = xmlnode.querySelector(
      'front>article-meta>pub-date[iso-8601-date]'
    );
    journalLocation.appendChild(
      createNode(
        'span',
        `(${
          journalDateNode ? journalDateNode.getAttribute('iso-8601-date') : ''
        })`,
        { 'data-ams-doc': 'journal date' }
      )
    );
    const journalPii = createNode('p', '', {
      'data-ams-doc': 'journal pii',
    });
    journalInfo.appendChild(journalPii);
    const piiNode = xmlnode.querySelector(
      'front>article-meta>article-id[pub-id-type="pii"]'
    );
    const doiNode = xmlnode.querySelector(
      'front>article-meta>article-id[pub-id-type="doi"]'
    );
    journalPii.appendChild(
      createNode('a', piiNode ? piiNode.textContent : '', {
        href: `https://doi.org/${doiNode ? doiNode.textContent : ''}`,
      })
    );
    recurseTheDom(
      header,
      xmlnode.querySelector('front>article-meta>title-group')
    );
    xmlnode.querySelectorAll('front>notes').forEach(recurseTheDom.bind(null, header));
    // add abstract
    recurseTheDom(
      section,
      xmlnode.querySelector('front>article-meta>abstract')
    );
    // add copyright page
    recurseTheDom(htmlParentNode, xmlnode.querySelector('front>article-meta'));
    // the article wrapper
    const artSection = createNode('section', '', {
      'data-ams-doc': 'article',
    });
    htmlParentNode.appendChild(artSection);
    // heading (again) TODO[postrelease] ams-html replaces this heading with the titlepage; after release, drop this heading and update ams-html
    recurseTheDom(
      artSection,
      xmlnode.querySelector('front>article-meta>title-group>article-title')
    );
    // recurse through the article content
    passThrough(artSection, xmlnode);
  };
  return article;
};
