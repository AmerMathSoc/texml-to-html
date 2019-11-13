const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const createNode = (document, tagname, content, properties) => {
  if (!properties) properties = {};
  const node = document.createElement(tagname);
  if (content) node.innerHTML = content;
  for (let prop of Object.keys(properties))
    node.setAttribute(prop, properties[prop]);
  return node;
};

const attributeDictionary = {
  id: 'id',
  rowspan: 'rowspan',
  colspan: 'colspan',
  'content-type': 'data-ams-content-type',
  'has-qed-box': 'data-ams-qed-box',
  hidden: 'hidden',
  position: 'data-ams-position',
  style: 'data-ams-style',
  'specific-use': 'data-ams-specific-use' // NOTE generic fallback; elementProcessors who do something different should remove the attribute from the xmlnode before calling mapAttributes
};

mapAttribute = (htmlNode, xmlNode, attributeName) => {
  const attributeValue = xmlNode.getAttribute(attributeName);
  if (!attributeValue) return;
  htmlNode.setAttribute(attributeName, attributeDictionary[attributeValue]);
};

const mapAttributes = (htmlNode, xmlNode) => {
  Object.keys(attributeDictionary).forEach(
    mapAttribute.bind(null, htmlNode, xmlNode)
  );
};

const setHead = (xmldoc, htmldoc) => {
  // add viewport meta tag
  const viewportmeta = htmldoc.createElement('meta');
  viewportmeta.setAttribute('name', 'viewport');
  viewportmeta.setAttribute('content', 'width=device-width');
  htmldoc.head.insertAdjacentElement('afterbegin', viewportmeta);
  // set title
  const xmlTitle =
    xmldoc.querySelector('front>article-meta>title-group>alt-title') ||
    xmldoc.querySelector(
      'book-meta>book-title-group>book-title, front>article-meta>title-group>article-title'
    );
  htmldoc.title = xmlTitle ? xmlTitle.textContent : 'AMS Publication';
};

const getClosestLevel = htmlParentNode => {
  const ancestor = htmlParentNode.closest('[data-ams-doc-level]');
  if (ancestor) return ancestor.getAttribute('data-ams-doc-level');
  else return null;
};

const elementProcessor = {
  preface: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const preface = createNode(htmldoc, 'section', '', { role: 'doc-preface' });
    htmlParentNode.appendChild(preface);
    passThrough(xmldoc, htmldoc, preface, xmlnode);
  },
  'book-meta': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const titlepage = createNode(htmldoc, 'section', '', {
      'data-ams-doc': 'titlepage'
    });
    htmlParentNode.appendChild(titlepage);

    const bookTitleGroup = xmlnode.querySelector('book-title-group');
    if (bookTitleGroup)
      recurseTheDom(xmldoc, htmldoc, titlepage, bookTitleGroup);

    const publKey = xmlnode.querySelector('book-id[book-id-type="publ_key"]');
    const series = publKey ? publKey.textContent : '';
    const seriesNode = createNode(htmldoc, 'span', series, {
      'data-ams-doc': 'series'
    });
    titlepage.appendChild(seriesNode);

    const contribGroupDL = createNode(htmldoc, 'dl');
    titlepage.appendChild(contribGroupDL);
    const contribGroup = xmlnode.querySelector('contrib-group');
    if (contribGroup)
      recurseTheDom(xmldoc, htmldoc, contribGroupDL, contribGroup);

    const footer = createNode(htmldoc, 'footer');
    titlepage.appendChild(footer);
    const footerDL = createNode(htmldoc, 'dl');
    footer.appendChild(footerDL);
    const footerDT = createNode(htmldoc, 'dt', 'Published by');
    footerDL.appendChild(footerDT);
    const publisher = xmlnode.querySelector('publisher');
    if (publisher) recurseTheDom(xmldoc, htmldoc, footerDL, publisher);

    const copyrightStatement = xmlnode.querySelector('copyright-statement');
    if (copyrightStatement)
      recurseTheDom(xmldoc, htmldoc, footer, copyrightStatement);
  },
  'book-title-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const header = createNode(htmldoc, 'header');
    htmlParentNode.appendChild(header);
    passThrough(xmldoc, htmldoc, header, xmlnode);
  },
  'book-title': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const heading = createNode(htmldoc, 'h1');
    htmlParentNode.appendChild(heading);
    passThrough(xmldoc, htmldoc, heading, xmlnode);
  },
  subtitle: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // NOTE was multiple templates: book-title-group/subtitle and mode=generic)
    const isbookTitleGroup = Boolean(xmlnode.closest('book-title-group'));
    if (!isbookTitleGroup) {
      passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
      return;
    }
    const p = createNode(htmldoc, 'p', '', { 'data-ams-doc': 'subtitle' });
    htmlParentNode.appendChild(p);
    passThrough(xmldoc, htmldoc, p, xmlnode);
  },
  'contrib-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // TODO handle sec-meta/contrib-group
    // if book-meta or article-meta
    let contentType = xmlnode.getAttribute('content-type');
    contentType =
      contentType[0].toUpperCase() +
      contentType.substring(1, contentType.length - 1);
    htmlParentNode.appendChild(
      createNode(htmldoc, 'dt', `${contentType} Information`)
    );
    passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
  },
  contrib: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const contentType = xmlnode.getAttribute('contrib-type');
    const dd = createNode(htmldoc, 'dd', '', {
      'data-ams-doc-contrib': `${contentType}s`
    });
    // NOTE (from xslt): author-comment needs to fit in a sentence
    // TODO (from xslt): this looks very hacky; should only apply to articles (thus should test for it).
    const authorComment = xmlnode.parentNode.querySelector('author-comment');
    if (authorComment)
      dd.setAttribute(
        'data-ams-doc-contrib-comment',
        authorComment.textContent
      );
    htmlParentNode.appendChild(dd);

    const dl = createNode(htmldoc, 'dl', '', {
      'data-ams-doc-contrib': contentType
    });
    dd.appendChild(dl);
    // TODO could be a name etc method
    dl.appendChild(
      createNode(
        htmldoc,
        'dt',
        `${xmlnode.querySelector('name>given-names').textContent}\u00A0${
          xmlnode.querySelector('name>surname').textContent
        }`,
        { 'data-ams-doc-contrib': `${contentType} name` }
      )
    );

    xmlnode
      .querySelectorAll('xref[ref-type="aff"]')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, dl));

    if (xmlnode.querySelector('email')) {
      const dd = createNode(htmldoc, 'dd');
      dl.appendChild(dd);
      xmlnode
        .querySelectorAll('email')
        .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, dd));
    }

    recurseTheDom(xmldoc, htmldoc, dl, xmlnode.querySelector('uri'));
    xmlnode
      .querySelectorAll('contrib-id')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, dl));
  },
  email: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const text = xmlnode.textContent;
    htmlParentNode.appendChild(
      createNode(htmldoc, 'a', text, { href: `mailto://${text}` })
    );
    if (xmlnode.nextElementSibling.tagName === 'email')
      htmlParentNode.appendChild(htmldoc.createTextNode(', '));
  },
  xref: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // TODO many more cases to cover later
    // case contrib/xref[ref-type="aff"]
    if (xmlnode.getAttribute('ref-type') === 'aff') {
      const dd = createNode(htmldoc, 'dd');
      htmlParentNode.appendChild(dd);
      const rid = xmlnode.getAttribute('rid');
      const aff = xmldoc.getElementById(rid);
      if (aff.getAttribute('specific-use') === 'current') {
        dd.appendChild(
          createNode(htmldoc, 'span', 'Address at time of publication: ')
        );
      }
      passThrough(xmldoc, htmldoc, dd, aff);
    }
  },
  uri: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    dd.appendChild(
      createNode(htmldoc, 'a', 'Homepage', { href: xmlnode.textContent })
    );
  },
  'contrib-id': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    const format = xmlnode.getAttribute('contrib-id-type');
    let text = 'Unknown Type';
    if (format === 'orcid') text = 'ORCID';
    else if (format === 'mrauth') text = 'MathSciNet';
    dd.appendChild(
      createNode(htmldoc, 'a', text, { href: xmlnode.textContent })
    );
  },
  publisher: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // only used in books
    const dd = createNode(htmldoc, 'dd', '', {
      'data-ams-doc': 'book publisher'
    });
    htmlParentNode.appendChild(dd);
    passThrough(xmldoc, htmldoc, dd, xmlnode);
  },
  'publisher-name': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '');
    htmlParentNode.appendChild(span);
    passThrough(xmldoc, htmldoc, span, xmlnode);
    if (xmlnode.nextElementSibling) {
      htmlParentNode.appendChild(htmldoc.createTextNode(', '));
    }
  },
  'publisher-loc': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '');
    htmlParentNode.appendChild(span);
    passThrough(xmldoc, htmldoc, span, xmlnode);
  },
  'ref-list': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const level = xmldoc.firstElementChild.tagName === 'book' ? '1' : '2'; // NOTE checks if document is a book
    const section = createNode(htmldoc, 'section', '', {
      role: 'doc-bibliography',
      'data-ams-doc-level': level
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    recurseTheDom(xmldoc, htmldoc, section, xmlnode.querySelector('title'));
    const dl = createNode(htmldoc, 'dl', '');
    section.appendChild(dl);
    xmlnode
      .querySelectorAll('ref')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, dl));
  },
  title: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const level = getClosestLevel(htmlParentNode);
    const heading = createNode(htmldoc, `h${level}`, '');
    htmlParentNode.appendChild(heading);
    passThrough(xmldoc, htmldoc, heading, xmlnode);
    // TODO continue or could this be enough?
  },
  'copyright-statement': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const isBook = xmldoc.firstElementChild.tagName === 'book'; // TODO extract into property or function?
    // if book
    if (isBook) {
      const p = createNode(htmldoc, 'p', '', {
        'data-ams-doc': 'book copyright'
      });
      htmlParentNode.appendChild(p);
      passThrough(xmldoc, htmldoc, p, xmlnode);
      return;
    }
    // if article
    htmlParentNode.appendChild(
      createNode(htmldoc, 'dt', 'Copyright Information')
    );
    const dd = createNode(htmldoc, 'dd', '', { 'data-ams-doc': 'copyright' });
    htmlParentNode.appendChild(dd);
    passThrough(xmldoc, htmldoc, dd, xmlnode);
  },
  article: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const section = createNode(htmldoc, 'section', '', {
      'data-ams-doc': 'titlepage'
    });
    htmlParentNode.appendChild(section);

    const header = createNode(htmldoc, 'header');
    section.appendChild(header);

    const journalInfo = createNode(htmldoc, 'aside', '', {
      'data-ams-doc': 'journal'
    });
    header.appendChild(journalInfo);
    // TODO journal information seems to get removed in ams-html. Drop it here and update ams-html.
    const journalTitle = createNode(
      htmldoc,
      'p',
      xmldoc.querySelector(
        'front>journal-meta>journal-title-group>journal-title'
      ).textContent,
      { 'data-ams-doc': 'journal title' }
    ); // NOTE no recursion (matches xslt)
    journalInfo.appendChild(journalTitle);
    const journalLocation = createNode(htmldoc, 'p', '', {
      'data-ams-doc': 'journal location'
    });
    journalInfo.appendChild(journalLocation);
    journalLocation.appendChild(
      createNode(
        htmldoc,
        'span',
        `Volume ${
          xmldoc.querySelector('front>article-meta>volume').textContent
        }, `,
        { 'data-ams-doc': 'journal volume' }
      )
    );
    journalLocation.appendChild(htmldoc.createTextNode(', '));
    journalLocation.appendChild(
      createNode(
        htmldoc,
        'span',
        `Issue ${xmldoc.querySelector('front>article-meta>issue').textContent}`,
        { 'data-ams-doc': 'journal issue' }
      )
    );
    journalLocation.appendChild(
      createNode(
        htmldoc,
        'span',
        `(${xmldoc
          .querySelector('front>article-meta>pub-date[iso-8601-date]')
          .getAttribute('iso-8601-date')})`,
        { 'data-ams-doc': 'journal date' }
      )
    );

    const journalPii = createNode(htmldoc, 'p', '', {
      'data-ams-doc': 'journal pii'
    });
    journalInfo.appendChild(journalPii);
    journalPii.appendChild(
      createNode(
        htmldoc,
        'a',
        xmldoc.querySelector('front>article-meta>article-id[pub-id-type="pii"]')
          .textContent,
        {
          href: `https://doi.org/${
            xmldoc.querySelector(
              'front>article-meta>article-id[pub-id-type="doi"]'
            ).textContent
          }`
        }
      )
    );

    recurseTheDom(
      xmldoc,
      htmldoc,
      header,
      xmldoc.querySelector('front>article-meta>title-group>article-title')
    );
    recurseTheDom(
      xmldoc,
      htmldoc,
      header,
      xmldoc.querySelector('front>notes[notes-type="dedication"]')
    );

    // add abstract
    recurseTheDom(
      xmldoc,
      htmldoc,
      section,
      xmldoc.querySelector('front>article-meta>abstract')
    );

    // add copyright page
    recurseTheDom(
      xmldoc,
      htmldoc,
      htmlParentNode,
      xmldoc.querySelector('front>article-meta')
    );

    // the article wrapper
    const artSection = createNode(htmldoc, 'section', '', {
      'data-ams-doc': 'article'
    });
    htmlParentNode.appendChild(artSection);
    // heading (again) TODO[postrelease] ams-html replaces this heading with the titlepage; after release, drop this heading and update ams-html
    recurseTheDom(
      xmldoc,
      htmldoc,
      artSection,
      xmldoc.querySelector('front>article-meta>title-group>article-title')
    );
    // recurse throught the article content
    passThrough(xmldoc, htmldoc, artSection, xmlnode);
  },
  'article-title': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const h1 = createNode(htmldoc, 'h1');
    htmlParentNode.appendChild(h1);
    passThrough(xmldoc, htmldoc, h1, xmlnode);
  },
  'article-meta': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const section = createNode(htmldoc, 'section', '', {
      'data-ams-doc': 'copyright-page'
    });
    htmlParentNode.appendChild(section);
    const h2 = createNode(htmldoc, 'h2', 'Article Information');
    section.appendChild(h2);
    const dl = createNode(htmldoc, 'dl');
    section.appendChild(dl);

    recurseTheDom(xmldoc, htmldoc, dl, xmlnode.querySelector('ams-meta-group'));
    recurseTheDom(xmldoc, htmldoc, dl, xmlnode.querySelector('kwd-group'));
    xmlnode
      .querySelectorAll('contrib-group')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, dl));
    recurseTheDom(xmldoc, htmldoc, dl, xmlnode.querySelector('funding-group'));
    recurseTheDom(xmldoc, htmldoc, dl, xmlnode.querySelector('custom-meta'));
    recurseTheDom(
      xmldoc,
      htmldoc,
      dl,
      xmlnode.parentNode.querySelector('journal-meta')
    );
    recurseTheDom(xmldoc, htmldoc, dl, xmlnode.querySelector('pub-date'));
    recurseTheDom(
      xmldoc,
      htmldoc,
      dl,
      xmlnode.querySelector('copyright-statement')
    );

    dl.appendChild(createNode(htmldoc, 'dt', 'Article References'));
    const artRefDD = createNode(htmldoc, 'dd');
    dl.appendChild(artRefDD);
    const artRefUL = createNode(htmldoc, 'ul');
    artRefDD.appendChild(artRefUL);
    xmlnode
      .querySelectorAll('self-uri')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, artRefUL));
    xmlnode
      .querySelectorAll('article-id')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, artRefUL));
    recurseTheDom(
      xmldoc,
      htmldoc,
      artRefUL,
      xmlnode.querySelector('article-citation')
    );
  },
  'ams-meta-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(
      createNode(
        htmldoc,
        'dt',
        `MSC ${xmlnode.querySelector('msc[scheme]').getAttribute('scheme')}`
      )
    );
    passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
  },
  msc: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(
      createNode(htmldoc, 'dt', `MSC ${xmlnode.getAttribute('scheme')}`)
    );
    // NOTE if msc is present, there must be primary's and there may be secondary's
    const primaryDD = createNode(htmldoc, 'dd', 'Primary: ');
    htmlParentNode.appendChild(primaryDD);
    xmlnode
      .querySelectorAll('primary')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, primaryDD));
    if (!xmlnode.querySelector('secondary')) return;
    const secondaryDD = createNode(htmldoc, 'dd', 'Secondary: ');
    htmlParentNode.appendChild(secondaryDD);
    xmlnode
      .querySelectorAll('secondary')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, secondaryDD));
  },
  primary: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const key = xmlnode.querySelector('key').textContent;
    const description = xmlnode.querySelector('description').textContent;
    const anchor = createNode(htmldoc, 'a', `${key} (${description})`, {
      href: `http://www.ams.org/msc/msc2010.html?t=${key}`
    });
    htmlParentNode.appendChild(anchor);
    const text =
      xmlnode.nextElementSibling &&
      xmlnode.nextElementSibling.tagName === xmlnode.tagName
        ? ', '
        : '\n';
    htmlParentNode.appendChild(htmldoc.createTextNode(text));
  },
  'kwd-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(createNode(htmldoc, 'dt', 'Keywords'));
    passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
  },
  'funding-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(createNode(htmldoc, 'dt', 'Additional Notes'));
    passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
  },
  'funding-statement': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    const p = createNode(htmldoc, 'p');
    dd.appendChild(p);
    passThrough(xmldoc, htmldoc, p, xmlnode);
  },
  'meta-name': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // NOTE currently, we only have custom-meta[@specific-use='communicated-by']>meta-name; future publications might need more here
    const dt = createNode(htmldoc, 'dt');
    htmlParentNode.appendChild(dt);
    passThrough(xmldoc, htmldoc, dt, xmlnode);
  },
  'meta-value': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // NOTE currently, we only have custom-meta[@specific-use='communicated-by']>meta-value; future publications might need more here
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    passThrough(xmldoc, htmldoc, dd, xmlnode);
  },
  'journal-meta': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(
      createNode(htmldoc, 'dt', 'Journal Information')
    );
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    // TODO refactor into methods (cf. journal/article-meta handling in titlepage)
    dd.appendChild(
      createNode(
        htmldoc,
        'a',
        xmlnode.querySelector('journal-title-group>journal-title').textContent,
        { href: xmlnode.querySelector('self-uri').getAttribute('xlink:href') }
      )
    );
    dd.appendChild(htmldoc.createTextNode(', '));
    dd.appendChild(
      createNode(
        htmldoc,
        'span',
        `Volume ${
          xmlnode.parentNode.querySelector('article-meta>volume').textContent
        }`
      )
    );
    dd.appendChild(htmldoc.createTextNode(', '));
    dd.appendChild(
      createNode(
        htmldoc,
        'span',
        `Issue ${
          xmlnode.parentNode.querySelector('article-meta>issue').textContent
        }`
      )
    );
    dd.appendChild(htmldoc.createTextNode(', ISSN '));
    dd.appendChild(
      createNode(
        htmldoc,
        'span',
        `${xmlnode.querySelector('journal-title-group>issn').textContent}`
      )
    );
    dd.appendChild(htmldoc.createTextNode(', published by the '));
    dd.appendChild(
      createNode(
        htmldoc,
        'span',
        `${xmlnode.querySelector('publisher>publisher-name').textContent}`
      )
    );
    dd.appendChild(htmldoc.createTextNode(', '));
    dd.appendChild(
      createNode(
        htmldoc,
        'span',
        `${xmlnode.querySelector('publisher>publisher-loc').textContent}`
      )
    );
    dd.appendChild(htmldoc.createTextNode('.'));
  },
  'pub-date': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(
      createNode(htmldoc, 'dt', 'Publication History')
    );
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    // TODO refactor into methods? (cf. journal-meta)
    dd.appendChild(htmldoc.createTextNode('This article was received on '));
    const rectime = xmlnode.parentNode
      .querySelector('history>date[date-type="received"]')
      .getAttribute('iso-8601-date');
    dd.appendChild(createNode(htmldoc, 'time', rectime, { datetime: rectime }));
    const rev = xmlnode.parentNode.querySelector(
      'history>date[date-type="rev-recd"]'
    );
    if (rev) {
      const revtime = rev.getAttribute('iso-8601-date');
      // TODO should be a time element like the others
      dd.appendChild(htmldoc.createTextNode(`,\u00A0revised on `));
      dd.appendChild(
        createNode(htmldoc, 'time', revtime, { datetime: revtime })
      );
    }
    dd.appendChild(htmldoc.createTextNode(',  and published on '));
    const pubtime = xmlnode.getAttribute('iso-8601-date');
    dd.appendChild(createNode(htmldoc, 'time', pubtime, { datetime: pubtime }));
    dd.appendChild(htmldoc.createTextNode('.'));
  },
  'self-uri': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const li = createNode(htmldoc, 'li');
    htmlParentNode.appendChild(li);
    const contentType = xmlnode.getAttribute('content-type') || '';
    const suffix = contentType === 'pdf' ? ' (PDF)' : '';
    const anchor = createNode(htmldoc, 'a', `Permalink${suffix}`, {
      href: xmlnode.getAttribute('xlink:href'),
      'data-ams-ref': contentType
    });
    li.appendChild(anchor);
  },
  'article-id': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const idType = xmlnode.getAttribute('pub-id-type');
    if (idType !== 'doi' && idType !== 'mr') return; // NOTE there's also "pii" but we only use those 2 values right now
    const isDOI = idType === 'doi';
    const litext = isDOI ? 'DOI ' : '';
    const li = createNode(htmldoc, 'li', litext);
    htmlParentNode.appendChild(li);
    const xmltext = xmlnode.textContent;
    const url = isDOI
      ? 'https://doi.org/' + xmltext
      : 'http://www.ams.org/mathscinet-getitem?mr=' + xmltext;
    li.appendChild(
      createNode(htmldoc, 'a', isDOI ? xmltext : 'MathSciNet Review', {
        href: url
      })
    );
  },
  'article-citation': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const li = createNode(htmldoc, 'li');
    htmlParentNode.appendChild(li);
    const code = createNode(htmldoc, 'code', xmlnode.textContent, {
      'data-ams-doc': 'amsref'
    });
    li.appendChild(code);
  },
  notes: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // so far, we only have one type
    if (xmlnode.getAttribute('notes-type') !== 'dedication') return;
    const div = createNode(htmldoc, 'div', '', { role: 'doc-dedication' });
    htmlParentNode.appendChild(div);
    passThrough(xmldoc, htmldoc, div, xmlnode);
  },
  abstract: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const level = getClosestLevel(htmlParentNode) || '2'; // NOTE in articles, we don't have a disp-level in the XML; also NOTE that this is a change from xslt which erroneously had hardcoded 1 but abstract/title still got an h2
    const section = createNode(htmldoc, 'section', '', {
      'data-ams-doc-level': level,
      role: 'doc-abstract'
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
  sec: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const level =
      getClosestLevel(htmlParentNode) ||
      xmlnode.closest('[disp-level]').getAttribute('disp-level');
    const section = createNode(htmldoc, 'section', '', {
      'data-ams-doc-level': level,
      'data-ams-doc': xmlnode.getAttribute('specific-use')
    });
    // mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
  'styled-content':  (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '', {'data-ams-style': xmlnode.getAttribute('style-type')});
    htmlParentNode.appendChild(span);
    passThrough(xmldoc, htmldoc, span, xmlnode);
  },
  'italic':  (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const tagname = xmlnode.getAttribute('toggle') === 'yes' ? 'em' : 'i';
    const node = createNode(htmldoc, tagname);
    htmlParentNode.appendChild(node);
    passThrough(xmldoc, htmldoc, node, xmlnode);
  },
  'bold':  (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const node = createNode(htmldoc, 'strong');
    htmlParentNode.appendChild(node);
    passThrough(xmldoc, htmldoc, node, xmlnode);
  },
};

elementProcessor['secondary'] = elementProcessor['primary'];

// pass through elements
const passThrough = (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
  xmlnode.childNodes.forEach(
    recurseTheDom.bind(null, xmldoc, htmldoc, htmlParentNode)
  );
};

const passThroughElements = [
  'book',
  'front-matter',
  'book-body',
  'book-back',
  'book-part',
  'named-book-part-body',
  'book-part-meta',
  'body',
  'description',
  'custom-meta-group',
  'custom-meta',
  'permissions',
  // 'secheading',
  'table-wrap',
  // 'toc-entry/title/xref',
  'back',
  'alternatives',
  'tex-math',
  'title-group',
  // 'xref/x'
];
const enablePassThrough = tagname => {
  elementProcessor[tagname] = passThrough;
};
passThroughElements.forEach(enablePassThrough);

const recurseTheDom = (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
  if (!xmlnode) return;
  if (xmlnode.nodeType === 3)
    htmlParentNode.appendChild(htmldoc.importNode(xmlnode, false));
  if (xmlnode.nodeType !== 1) return;
  // console.log(xmlnode.tagName);
  if (elementProcessor[xmlnode.tagName])
    elementProcessor[xmlnode.tagName](xmldoc, htmldoc, htmlParentNode, xmlnode);
  // else we drop/ignore the node
};

const main = xmlstring => {
  const xml = new JSDOM(xmlstring, { contentType: 'text/xml' });
  const xmldoc = xml.window.document;

  const html = new JSDOM('');
  const htmldoc = html.window.document;

  setHead(xmldoc, htmldoc);

  const root = xmldoc.querySelector('book, article');
  recurseTheDom(xmldoc, htmldoc, htmldoc.body, root);

  return html;
};

module.exports = main;

if (require.main === module) {
  const input = fs.readFileSync(path.resolve(process.argv[2])).toString();
  const output = path.resolve(process.argv[3]);
  const html = main(input);
  fs.writeFileSync(output, html.serialize());
}
