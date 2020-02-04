module.exports = (recurseTheDom, passThrough, createNode) => {
  const article = (htmlParentNode, xmlnode) => {
    const section = createNode('section', '', {
      'data-ams-doc': 'titlepage'
    });
    htmlParentNode.appendChild(section);
    const header = createNode('header');
    section.appendChild(header);
    const journalInfo = createNode('aside', '', {
      'data-ams-doc': 'journal'
    });
    header.appendChild(journalInfo);
    // TODO journal information seems to get removed in ams-html. Drop it here and update ams-html.
    const journalTitle = createNode(
      'p',
      xmlnode.querySelector(
        'front>journal-meta>journal-title-group>journal-title'
      ).textContent,
      { 'data-ams-doc': 'journal title' }
    ); // NOTE no recursion (matches xslt)
    journalInfo.appendChild(journalTitle);
    const journalLocation = createNode('p', '', {
      'data-ams-doc': 'journal location'
    });
    journalInfo.appendChild(journalLocation);
    const volume = xmlnode.querySelector('front>article-meta>volume');
    journalLocation.appendChild(
      createNode(
        'span',
        `Volume ${
          volume ? volume.textContent : ''
        }, `,
        { 'data-ams-doc': 'journal volume' }
      )
    );
    const issue = xmlnode.querySelector('front>article-meta>issue');
    journalLocation.appendChild(
      createNode(
        'span',
        `Issue ${
          issue ? issue.textContent : ''
        }`,
        { 'data-ams-doc': 'journal issue' }
      )
    );
    journalLocation.appendChild(
      createNode(
        'span',
        `(${xmlnode
          .querySelector('front>article-meta>pub-date[iso-8601-date]')
          .getAttribute('iso-8601-date')})`,
        { 'data-ams-doc': 'journal date' }
      )
    );
    const journalPii = createNode('p', '', {
      'data-ams-doc': 'journal pii'
    });
    journalInfo.appendChild(journalPii);
    journalPii.appendChild(
      createNode(
        'a',
        xmlnode.querySelector(
          'front>article-meta>article-id[pub-id-type="pii"]'
        ).textContent,
        {
          href: `https://doi.org/${
            xmlnode.querySelector(
              'front>article-meta>article-id[pub-id-type="doi"]'
            ).textContent
          }`
        }
      )
    );
    recurseTheDom(
      header,
      xmlnode.querySelector('front>article-meta>title-group>article-title')
    );
    recurseTheDom(
      header,
      xmlnode.querySelector('front>notes[notes-type="dedication"]')
    );
    // add abstract
    recurseTheDom(
      section,
      xmlnode.querySelector('front>article-meta>abstract')
    );
    // add copyright page
    recurseTheDom(htmlParentNode, xmlnode.querySelector('front>article-meta'));
    // the article wrapper
    const artSection = createNode('section', '', {
      'data-ams-doc': 'article'
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
