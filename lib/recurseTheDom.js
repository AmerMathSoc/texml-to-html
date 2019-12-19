const createNode = (document, tagname, content, properties) => {
  if (!properties) properties = {};
  const node = document.createElement(tagname);
  if (content) node.innerHTML = content;
  for (let prop of Object.keys(properties))
    node.setAttribute(prop, properties[prop]);
  return node;
};

const sectioningDictionary = {
  part: 0,
  chapter: 0,
  section: 1,
  subsection: 2,
  subsubsection: 3,
  paragraph: 4,
  subparagraph: 5
};

const attributeDictionary = {
  id: 'id',
  rowspan: 'rowspan',
  colspan: 'colspan',
  'content-type': 'data-ams-content-type',
  'has-qed-box': 'data-ams-qed-box',
  hidden: 'hidden',
  style: 'data-ams-style',
  'specific-use': 'data-ams-specific-use' // NOTE generic fallback; elementProcessors who do something different should remove the attribute from the xmlnode before calling mapAttributes
};

const mapAttribute = (htmlNode, xmlNode, attributeName) => {
  const attributeValue = xmlNode.getAttribute(attributeName);
  if (!attributeValue) return;
  htmlNode.setAttribute(attributeDictionary[attributeName], attributeValue);
};

const mapAttributes = (htmlNode, xmlNode) => {
  Object.keys(attributeDictionary).forEach(
    mapAttribute.bind(null, htmlNode, xmlNode)
  );
};

const getParentLevel = htmlParentNode =>
  parseInt(htmlParentNode.getAttribute('data-ams-doc-level'));

const elementProcessor = {
  preface: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // NOTE should only occur in books
    const preface = createNode(htmldoc, 'section', '', {
      role: 'doc-preface',
      'data-ams-doc-level': 0
    });
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
    xmlnode
      .querySelectorAll('publisher')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, footerDL));

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
    // NOTE otherwise (so far) subtitles are handled by title/label handling which creates a header as htmlParent
    const isInHeader = htmlParentNode.tagName === 'HEADER';
    if (!(isbookTitleGroup || isInHeader)) {
      return;
    }
    const p = createNode(htmldoc, 'p', '', { 'data-ams-doc': 'subtitle' });
    htmlParentNode.appendChild(p);
    passThrough(xmldoc, htmldoc, p, xmlnode);
  },
  'contrib-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const isBook = xmldoc.firstElementChild.tagName === 'book'; // TODO extract into property or function?
    // if sec-meta in Book
    if (isBook && xmlnode.parentNode.tagName === 'sec-meta') {
      const p = createNode(htmldoc, 'p');
      htmlParentNode.appendChild(p);
      // TODO very hacky.
      // NOTE sec-meta>contrib-group>author-comment without contrib only appears in MCL01, MCL14
      const firstElementChild = xmlnode.firstElementChild;
      if (firstElementChild.tagName === 'author-comment') {
        const span = createNode(htmldoc, 'span');
        p.appendChild(span);
        passThrough(xmldoc, htmldoc, span, firstElementChild);
      }
      passThrough(xmldoc, htmldoc, p, xmlnode);
      return;
    }
    // if book-meta or article-meta
    const contentType = xmlnode.getAttribute('content-type');
    const contentTypeCased =
      contentType[0].toUpperCase() +
      contentType.substring(1, contentType.length - 1);
    htmlParentNode.appendChild(
      createNode(htmldoc, 'dt', `${contentTypeCased} Information`)
    );
    const dd = createNode(htmldoc, 'dd', '', {
      'data-ams-doc-contrib': `${contentType}`
    });
    // NOTE (from xslt): author-comment needs to fit in a sentence
    // TODO (from xslt): this looks very hacky; should only apply to articles (thus should test for it).
    const authorComment = xmlnode.querySelector('author-comment');
    if (authorComment)
      dd.setAttribute(
        'data-ams-doc-contrib-comment',
        authorComment.textContent
      );
    htmlParentNode.appendChild(dd);
    passThrough(xmldoc, htmldoc, dd, xmlnode);
  },
  contrib: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const contentType = xmlnode.getAttribute('contrib-type');
    // TODO (long term) One DL per contrib seems odd. Should contrib-group create a single DL around the contrib's DT+DDs?
    const dl = createNode(htmldoc, 'dl', '', {
      'data-ams-doc-contrib': contentType
    });
    htmlParentNode.appendChild(dl);
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
    if (
      xmlnode.nextElementSibling &&
      xmlnode.nextElementSibling.tagName === 'email'
    )
      htmlParentNode.appendChild(htmldoc.createTextNode(', '));
  },
  xref: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // case tex-math/xref, tex-math/text/xref (with a check for footnotes in tex-math)
    const texmathAncestor = xmlnode.closest('tex-math');
    const foonoteAncestor = xmlnode.closest('fn');
    if (
      texmathAncestor &&
      !(
        foonoteAncestor &&
        [...texmathAncestor.querySelectorAll('*')].includes(foonoteAncestor)
      )
    ) {
      const refType = xmlnode.getAttribute('ref-type');
      const rid = xmlnode.getAttribute('rid');
      const isInText = xmlnode.closest('text');
      const isFootnoteRef = refType === 'fn';
      if (isInText) htmlParentNode.insertAdjacentText('beforeend', `$`);
      htmlParentNode.insertAdjacentText(
        'beforeend',
        ` \\xhref[${refType}]{#${rid}}{` // TODO HACK: the leading whitespace avoids a MathJax bug (Theorem with footnotes in test01.xml)
      );
      if (isFootnoteRef) htmlParentNode.insertAdjacentText('beforeend', `{}^{`);
      htmlParentNode.insertAdjacentText('beforeend', xmlnode.textContent);
      if (isFootnoteRef) htmlParentNode.insertAdjacentText('beforeend', `}`);
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      if (isInText) htmlParentNode.insertAdjacentText('beforeend', `$`);
      return;
    }
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
      return;
    }
    const rid = xmlnode.getAttribute('rid');
    if (!rid) {
      const span = createNode(htmldoc, 'span', '', {
        'data-ams-ref': 'notrid'
      });
      htmlParentNode.appendChild(span);
      passThrough(xmldoc, htmldoc, span, xmlnode);
      return;
    }
    const refType = xmlnode.getAttribute('ref-type');
    const anchor = createNode(htmldoc, 'a', '', {
      href: `#${rid}`,
      'data-ams-ref': refType
    });
    const typeToRole = {
      fn: 'doc-noteref',
      bibr: 'doc-biblioref'
    };
    if (typeToRole[refType]) anchor.setAttribute('role', typeToRole[refType]);
    if (refType === 'bibr') {
      const cite = createNode(htmldoc, 'cite');
      cite.appendChild(anchor);
      htmlParentNode.appendChild(cite);
    } else {
      htmlParentNode.appendChild(anchor);
    }
    passThrough(xmldoc, htmldoc, anchor, xmlnode);
  },
  x: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    if (xmlnode.parentNode.tagName !== 'xref') return;
    passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
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
    const level = xmldoc.firstElementChild.tagName === 'book' ? '0' : '1'; // NOTE checks if document is a book
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
  'mixed-citation': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    const div = createNode(htmldoc, 'div', '', { role: 'doc-biblioentry' });
    dd.appendChild(div);
    // NOTE xslt would map attributes but we have no content with attributes on mixed-citations
    passThrough(xmldoc, htmldoc, div, xmlnode);
    const rawCitation = xmlnode.parentNode.querySelector('raw-citation');
    if (!rawCitation) return;
    const code = createNode(htmldoc, 'code', rawCitation.textContent, {
      'data-ams-doc': 'amsref'
    });
    div.appendChild(code);
  },
  label: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // handle fn
    if (xmlnode.parentNode.tagName === 'fn') return;
    // handle ref
    if (xmlnode.parentNode.tagName === 'ref') {
      const dt = createNode(htmldoc, 'dt', '', {
        id: xmlnode.parentNode.getAttribute('id')
      });
      htmlParentNode.appendChild(dt);
      const span = createNode(htmldoc, 'span'); // TODO can the wrapping span be dropped?
      dt.appendChild(span);
      passThrough(xmldoc, htmldoc, span, xmlnode);
      return;
    }
    // handle fig, fig-group via caption
    if (
      xmlnode.parentNode.tagName === 'fig' ||
      xmlnode.parentNode.tagName === 'fig-group'
    ) {
      elementProcessor['caption'](xmldoc, htmldoc, htmlParentNode, xmlnode);
      return;
    }
    const nextSibling = xmlnode.nextElementSibling;
    // NOTE if a label is followed by a title, we skip (and pull in the label later on when processing title)
    if (nextSibling && nextSibling.tagName === 'title') return;
    // NOTE ignore empty label
    if (xmlnode.tagName === 'label' && xmlnode.innerHTML.trim() === '') return;
    const previousSibling = xmlnode.previousElementSibling;
    const hasLabelSibling =
      previousSibling &&
      previousSibling.tagName === 'label' &&
      previousSibling.innerHTML.trim !== '';
    const hasSubtitleSibling =
      nextSibling &&
      nextSibling.tagName === 'subtitle' &&
      nextSibling.innerHTML.trim !== '';
    // TODO refactor
    let maybeSecmetaSibling = null;
    if (
      previousSibling &&
      previousSibling.tagName === 'sec-meta' &&
      previousSibling.innerHTML.trim !== ''
    )
      maybeSecmetaSibling = previousSibling;
    if (
      previousSibling &&
      previousSibling.previousElementSibling &&
      previousSibling.previousElementSibling.tagName === 'sec-meta' &&
      previousSibling.previousElementSibling.innerHTML.trim !== ''
    )
      maybeSecmetaSibling = previousSibling.previousElementSibling;
    const isStatement = xmlnode.parentNode.tagName === 'statement';
    const level = getParentLevel(htmlParentNode) + 1;
    const header = createNode(htmldoc, 'header');
    const heading = createNode(htmldoc, `h${level}`, '');
    if (hasSubtitleSibling) {
      htmlParentNode.appendChild(header);
      header.appendChild(heading);
    } else {
      htmlParentNode.appendChild(heading);
    }
    if (hasLabelSibling) {
      passThrough(xmldoc, htmldoc, heading, previousSibling);
      const labelSeparatorString = isStatement ? ' ' : '. ';
      heading.appendChild(htmldoc.createTextNode(labelSeparatorString));
    }
    passThrough(xmldoc, htmldoc, heading, xmlnode);
    if (isStatement) heading.appendChild(htmldoc.createTextNode('. '));
    if (hasSubtitleSibling) recurseTheDom(xmldoc, htmldoc, header, nextSibling);
    if (maybeSecmetaSibling) {
      // NOTE (from xslt) sec-meta only occurs in 3 publications: MCL01, MCL14 and JAMS410; the tests only test for those specific situations
      // TODO (from xslt) find a cleaner solution, e.g., general purpose markup + publication specific customization
      const secmetaSection = createNode(htmldoc, 'section', '', {
        'data-ams-doc': 'sec-meta'
      });
      htmlParentNode.appendChild(secmetaSection);
      if (xmldoc.firstElementChild.tagName === 'article') {
        const dl = createNode(htmldoc, 'dl');
        secmetaSection.appendChild(dl);
        recurseTheDom(
          xmldoc,
          htmldoc,
          dl,
          maybeSecmetaSibling.querySelector('contrib-group')
        );
      } else {
        recurseTheDom(
          xmldoc,
          htmldoc,
          secmetaSection,
          maybeSecmetaSibling.querySelector('contrib-group')
        );
      }
      recurseTheDom(
        xmldoc,
        htmldoc,
        secmetaSection,
        maybeSecmetaSibling.querySelector('abstract')
      );
    }
  },
  'string-name': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '', {
      'data-ams-doc': 'stringname'
    });
    htmlParentNode.appendChild(span);
    passThrough(xmldoc, htmldoc, span, xmlnode);
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
    const anchor = createNode(htmldoc, 'a', `${key} (`, {
      href: `http://www.ams.org/msc/msc2010.html?t=${key}`
    });
    htmlParentNode.appendChild(anchor);
    const description = xmlnode.querySelector('description');
    description.innerHTML = description.innerHTML.trim(); // NOTE since we add ( earlier, we need to trim whitespace that texml creates TODO update test case after switch to JS
    passThrough(xmldoc, htmldoc, anchor, description);
    anchor.insertAdjacentText('beforeend', ')');
    const text =
      xmlnode.nextElementSibling &&
      xmlnode.nextElementSibling.tagName === xmlnode.tagName
        ? ', '
        : '\n';
    htmlParentNode.appendChild(htmldoc.createTextNode(text));
  },
  'kwd-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(createNode(htmldoc, 'dt', 'Keywords'));
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    const ul = createNode(htmldoc, 'ul');
    dd.appendChild(ul);
    passThrough(xmldoc, htmldoc, ul, xmlnode);
  },
  kwd: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const li = createNode(htmldoc, 'li');
    htmlParentNode.appendChild(li);
    passThrough(xmldoc, htmldoc, li, xmlnode);
  },
  'funding-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(createNode(htmldoc, 'dt', 'Additional Notes'));
    const dd = createNode(htmldoc, 'dd');
    htmlParentNode.appendChild(dd);
    passThrough(xmldoc, htmldoc, dd, xmlnode);
  },
  'funding-statement': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // TODO map funding-statement() to p()?
    const p = createNode(htmldoc, 'p');
    htmlParentNode.appendChild(p);
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
    // revision dates
    const revs = xmlnode.parentNode.querySelectorAll(
      'history>date[date-type="rev-recd"]'
    );
    if (revs.length > 0)
      dd.appendChild(htmldoc.createTextNode(`,\u00A0revised on `));
    else dd.insertAdjacentText('beforeend', ' ');
    revs.forEach(rev => {
      const revtime = rev.getAttribute('iso-8601-date');
      // TODO should be a time element like the others
      dd.appendChild(
        createNode(htmldoc, 'time', revtime, { datetime: revtime })
      );
      dd.insertAdjacentText('beforeend', ', ');
    });
    dd.appendChild(htmldoc.createTextNode(' and published on ')); // TODO extra space b/c xslt does this; can be dropped later
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
    const level = getParentLevel(htmlParentNode) || '1'; // NOTE in articles, we don't have a disp-level in the XML; also NOTE that this is a change from xslt which erroneously had hardcoded 1 but abstract/title still got an h2
    const section = createNode(htmldoc, 'section', '', {
      'data-ams-doc-level': level,
      role: 'doc-abstract'
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
  sec: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const isBook = xmldoc.firstElementChild.tagName === 'book';
    const tagName = xmlnode.tagName;
    const specificUse = xmlnode.getAttribute('specific-use');
    const articleWithPartIncrement =
      !isBook && xmldoc.querySelector('sec[specific-use="part"]') ? 1 : 0; // NOTE only jams882 TODO can we do better?
    const hasDictionaryEntry = sectioningDictionary[specificUse] !== undefined;
    const ancestorWithLevel = htmlParentNode.closest('[data-ams-doc-level]');
    // if there is no sectioningDictionary entry, we use the ancestor to decide, if 0 or 5 is appropriate.
    // NOTE front-matter (aliased to sec()) doesn't have an ancestor.
    const level = hasDictionaryEntry
      ? sectioningDictionary[specificUse]
      : ancestorWithLevel
      ? 5
      : 0;
    const section = createNode(htmldoc, 'section', '', {
      'data-ams-doc-level': level + articleWithPartIncrement,
      'data-ams-doc': specificUse,
      id: xmlnode.getAttribute('id')
    });
    htmlParentNode.appendChild(section);

    if (specificUse === 'chapter') {
      section.setAttribute('role', 'doc-chapter');
      section.removeAttribute('specific-use');
    }
    if (tagName === 'dedication')
      section.setAttribute('role', 'doc-dedication');

    const titleChild = xmlnode.querySelector('title');
    if (
      tagName === 'ack' ||
      (titleChild && titleChild.textContent.startsWith('Acknowledg'))
    ) {
      section.setAttribute('role', 'doc-acknowledgments');
    }
    if (tagName === 'ack' && !isBook)
      section.setAttribute('data-ams-doc-level', '1');
    if (titleChild && titleChild.textContent.startsWith('Introduction'))
      section.setAttribute('role', 'doc-introduction');

    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
  'styled-content': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '', {
      'data-ams-style': xmlnode.getAttribute('style-type')
    });
    htmlParentNode.appendChild(span);
    passThrough(xmldoc, htmldoc, span, xmlnode);
  },
  italic: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const tagname = xmlnode.getAttribute('toggle') === 'yes' ? 'em' : 'i';
    const node = createNode(htmldoc, tagname);
    htmlParentNode.appendChild(node);
    passThrough(xmldoc, htmldoc, node, xmlnode);
  },
  bold: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const node = createNode(htmldoc, 'strong');
    htmlParentNode.appendChild(node);
    passThrough(xmldoc, htmldoc, node, xmlnode);
  },
  'disp-quote': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const blockquote = createNode(htmldoc, 'blockquote', '', {
      'data-ams-style': xmlnode.getAttribute('specific-use')
    });
    if (htmlParentNode.tagName === 'P')
      htmlParentNode.insertAdjacentElement('afterend', blockquote);
    else htmlParentNode.appendChild(blockquote);
    passThrough(xmldoc, htmldoc, blockquote, xmlnode);
  },
  attrib: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    let actualParent = htmlParentNode;
    if (xmlnode.parentNode.tagName === 'disp-quote') {
      const footer = createNode(htmldoc, 'footer');
      htmlParentNode.appendChild(footer);
      actualParent = footer;
    }
    if (
      xmlnode.parentNode.tagName === 'fig' ||
      xmlnode.parentNode.tagName === 'fig-group'
    ) {
      // NOTE firstElementChild should be a figcaption element (cf. caption() )
      // TODO brittle. Can we do better?
      actualParent = htmlParentNode.firstElementChild;
    }
    const span = createNode(htmldoc, 'span');
    actualParent.insertAdjacentText('beforeend', ' '); // NOTE needed inside fig-caption
    actualParent.appendChild(span);
    passThrough(xmldoc, htmldoc, span, xmlnode);
  },
  fn: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '', { role: 'doc-footnote' });
    htmlParentNode.appendChild(span);
    mapAttributes(span, xmlnode);
    passThrough(xmldoc, htmldoc, span, xmlnode);
  },
  p: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    let paragraph = createNode(htmldoc, 'p');
    if (htmlParentNode.closest('p, span[role=doc-footnote]'))
      paragraph = createNode(htmldoc, 'span', '', {
        'data-ams-doc': 'paragraph'
      });
    mapAttributes(paragraph, xmlnode);
    htmlParentNode.appendChild(paragraph);
    passThrough(xmldoc, htmldoc, paragraph, xmlnode);
  },
  'def-list': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const dl = createNode(htmldoc, 'dl');
    mapAttributes(dl, xmlnode);
    // NOTE DOM let's us insert DL in p, which is invalid
    if (htmlParentNode.tagName === 'P')
      htmlParentNode.insertAdjacentElement('afterend', dl);
    else htmlParentNode.appendChild(dl);
    passThrough(xmldoc, htmldoc, dl, xmlnode);
  },
  'def-item': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const isBook = xmldoc.firstElementChild.tagName === 'book';
    if (isBook) {
      passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
      return;
    }
    const div = createNode(htmldoc, 'div');
    htmlParentNode.appendChild(div);
    passThrough(xmldoc, htmldoc, div, xmlnode);
  },
  term: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const dt = createNode(htmldoc, 'dt');
    mapAttributes(dt, xmlnode);
    // TODO DT gets id from def-item; cf above.
    dt.setAttribute('id', xmlnode.parentNode.id);
    htmlParentNode.appendChild(dt);
    passThrough(xmldoc, htmldoc, dt, xmlnode);
  },
  def: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const dd = createNode(htmldoc, 'dd');
    mapAttributes(dd, xmlnode);
    htmlParentNode.appendChild(dd);
    passThrough(xmldoc, htmldoc, dd, xmlnode);
  },
  'app-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const section = createNode(htmldoc, 'section', '', {
      role: 'doc-appendix'
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
  app: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const isBook = xmldoc.firstElementChild.tagName === 'book'; // TODO extract into property or function?
    // if book
    if (isBook) {
      // NOTE (from xslt) app only applies in books since articles always have app within app-group (cf. template for app-group/app above) -->
      // TODO (from xslt) (BREAKING CHANGE) remove app-group/app and make app-group pass-through - the role should be on each app, not on wrapper from app-group; but watch out for app with Acknowledgements. -->
      // NOTE (from xslt) should we add data-ams-doc-level="{@disp-level}" data-ams-doc="{@specific-use}"? We expect them for heading level computation. -->
      const section = createNode(htmldoc, 'section', '', {
        role: 'doc-appendix',
        'data-ams-doc-level': 0
      });
      htmlParentNode.appendChild(section);
      mapAttributes(section, xmlnode);
      passThrough(xmldoc, htmldoc, section, xmlnode);
      return;
    }
    // if article
    const section = createNode(htmldoc, 'section', '', {
      'data-ams-doc-level': '1'
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
  statement: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const section = createNode(htmldoc, 'section', '', {
      'data-ams-doc': 'statement',
      'data-ams-doc-level':
        htmlParentNode.getAttribute('data-ams-doc') === 'statement'
          ? getParentLevel(htmlParentNode)
          : getParentLevel(htmlParentNode) + 1
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
  secheading: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '', {
      'data-ams-doc': 'secheading'
    });
    htmlParentNode.appendChild(span);
    const label = xmlnode.querySelector('label');
    const title = xmlnode.querySelector('title');
    if (label) {
      passThrough(xmldoc, htmldoc, span, label);
    }
    if (title && label) {
      span.appendChild(htmldoc.createTextNode('. '));
      // TODO his does not match label/title punctuation where a title without label would get a period.
    }
    passThrough(xmldoc, htmldoc, span, title);
  },
  graphic: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const img = createNode(htmldoc, 'img', '', {
      'data-ams-doc': xmlnode.tagName,
      src: xmlnode.getAttribute('xlink:href'),
      'data-ams-style': xmlnode.getAttribute('specific-use'),
      'data-ams-width': xmlnode.getAttribute('width'),
      'data-ams-height': xmlnode.getAttribute('height'),
      alt: ''
    });
    htmlParentNode.appendChild(img);
    if (xmlnode.parentNode.tagName !== 'fig') return;
    // NOTE We assume alt-text appears only in figures; cf. AmerMathSoc/texml#55
    const altText = xmlnode.parentNode.querySelector('alt-text');
    if (altText) img.setAttribute('alt', altText.textContent);
  },
  img: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const img = createNode(htmldoc, 'img', '', {
      src: xmlnode.getAttribute('src'),
      alt: xmlnode.getAttribute('alt') || ''
    });
    htmlParentNode.appendChild(img);
  },
  fig: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const figure = createNode(htmldoc, 'figure', '', {
      role: 'group',
      id: xmlnode.getAttribute('id'),
      'data-ams-position': xmlnode.getAttribute('position'),
      'data-ams-doc': xmlnode.tagName
    });
    htmlParentNode.appendChild(figure);
    passThrough(xmldoc, htmldoc, figure, xmlnode);
  },
  caption: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const isLabel = xmlnode.tagName === 'label';
    if (
      isLabel &&
      xmlnode.nextElementSibling &&
      xmlnode.nextElementSibling.tagName === 'caption'
    ) {
      return;
    }
    const isSubfigure =
      xmlnode.parentNode.tagName === 'fig' &&
      xmlnode.parentNode.parentNode.tagName === 'fig-group';
    const previousSibling = xmlnode.previousElementSibling;
    const hasLabel = previousSibling && previousSibling.tagName === 'label';

    const figcaption = createNode(htmldoc, 'figcaption');
    htmlParentNode.appendChild(figcaption);

    if (isLabel || hasLabel) {
      const label = isLabel ? xmlnode : previousSibling;
      const strong = createNode(htmldoc, 'strong');
      figcaption.appendChild(strong);
      if (isSubfigure) strong.insertAdjacentText('afterbegin', '(');
      passThrough(xmldoc, htmldoc, strong, label);
      strong.insertAdjacentText('beforeend', isSubfigure ? ') ' : '. ');
    }
    if (isLabel) return;
    passThrough(xmldoc, htmldoc, figcaption, xmlnode);
  },
  toc: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const nav = createNode(htmldoc, 'nav', '', {
      role: 'doc-toc',
      'data-ams-doc-level': '0'
    });
    htmlParentNode.appendChild(nav);
    recurseTheDom(xmldoc, htmldoc, nav, xmlnode.querySelector('title-group'));
    const ol = createNode(htmldoc, 'ol');
    nav.appendChild(ol);
    [...xmlnode.childNodes]
      .filter(node => node.tagName === 'toc-entry')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, ol));
  },
  'toc-entry': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const li = createNode(htmldoc, 'li');
    htmlParentNode.appendChild(li);
    const anchor = createNode(htmldoc, 'a', '', {
      href: `#${xmlnode.querySelector('nav-pointer').getAttribute('rid')}`
    });
    li.appendChild(anchor);
    // TODO unify label/title processing with label() - requires some form of new wrapper around content in lieu of heading (or have it add the anchor but then the nav-pointer will be odd to pull in)
    const firstElementChild = xmlnode.firstElementChild;
    const label =
      firstElementChild.tagName === 'label' ? firstElementChild : null;
    const title =
      firstElementChild.tagName === 'label'
        ? firstElementChild.nextElementSibling
        : firstElementChild;
    if (label && label.innerHTML.trim !== '') {
      passThrough(xmldoc, htmldoc, anchor, label);
      anchor.insertAdjacentText('beforeend', '. ');
    }
    if (title) passThrough(xmldoc, htmldoc, anchor, title);
    if (!xmlnode.querySelector('toc-entry')) return;
    // nested toc-entries means we have a sub-toc
    const ol = createNode(htmldoc, 'ol');
    li.appendChild(ol);
    [...xmlnode.childNodes]
      .filter(node => node.tagName === 'toc-entry')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, ol));
  },
  'inline-formula': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const mathMode = xmlnode.tagName === 'inline-formula' ? 'inline' : 'block';
    const span = createNode(htmldoc, 'span', '', {
      'data-ams-doc': `math ${mathMode}`
    });
    htmlParentNode.appendChild(span);
    if (mathMode === 'block' && xmlnode.querySelector('tex-math[has-qed-box]'))
      span.setAttribute('data-ams-qed-box', 'true'); // TODO xslt only did this for disp-formula; but bproc 10 (then again: only bproc10) has inline-formula with qed-box
    passThrough(xmldoc, htmldoc, span, xmlnode);
    // NOTE tex-math may include some foonotes which we must push to the end
    span
      .querySelectorAll('span[role="doc-footnote"]')
      .forEach(node => span.insertAdjacentElement('afterend', node));
    // TODO we (sometimes?) get extra whitespace from childnodes; needs test
    const text = span.innerHTML;
    span.innerHTML = text.replace(/[ \n]+/g, ' ');
    // NOTE ensures prettier will not format TeX strings
    // NOTE ams-xml-to-html.js removes them again after serialization.
    // TODO prettier/prettier#7103 is preventing prettier
    // span.insertAdjacentHTML('beforebegin', '<!-- prettier-ignore -->')
  },
  text: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    if (xmlnode.closest('tex-math')) {
      htmlParentNode.insertAdjacentText('beforeend', '\\text{');
      passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', '}');
    }
  },
  'ext-link': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const anchor = createNode(htmldoc, 'a', '', {
      href: xmlnode.getAttribute('xlink:href')
    });
    htmlParentNode.appendChild(anchor);
    passThrough(xmldoc, htmldoc, anchor, xmlnode);
  },
  break: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const br = createNode(htmldoc, 'br');
    htmlParentNode.appendChild(br);
  },
  target: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span');
    htmlParentNode.appendChild(span);
    mapAttributes(span, xmlnode);
    passThrough(xmldoc, htmldoc, span, xmlnode);
  }
};

// other mappings

elementProcessor['secondary'] = elementProcessor['primary'];

const tagToDataStyle = (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
  const span = createNode(htmldoc, 'span', '', {
    'data-ams-style': xmlnode.tagName
  });
  htmlParentNode.appendChild(span);
  passThrough(xmldoc, htmldoc, span, xmlnode);
};

elementProcessor['roman'] = tagToDataStyle;
elementProcessor['sc'] = tagToDataStyle;
elementProcessor['monospace'] = tagToDataStyle;
elementProcessor['underline'] = tagToDataStyle;

elementProcessor['ack'] = elementProcessor['sec'];
elementProcessor['front-matter-part'] = elementProcessor['sec'];
elementProcessor['dedication'] = elementProcessor['sec'];

elementProcessor['title'] = elementProcessor['label'];

elementProcessor['inline-graphic'] = elementProcessor['graphic'];

elementProcessor['fig-group'] = elementProcessor['fig'];
elementProcessor['verse-group'] = elementProcessor['fig'];

elementProcessor['disp-formula'] = elementProcessor['inline-formula'];

const elementsToCopy = [
  'sup',
  'sub',
  'table',
  'tbody',
  'thead',
  'th',
  'tr',
  'td',
  'pre'
];
const copyElement = (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
  const copy = createNode(htmldoc, xmlnode.tagName);
  htmlParentNode.appendChild(copy);
  mapAttributes(copy, xmlnode);
  passThrough(xmldoc, htmldoc, copy, xmlnode);
};

elementsToCopy.forEach(tag => (elementProcessor[tag] = copyElement));

// pass through elements
const passThrough = (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
  if (!xmlnode) return;
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
  'ams-meta-group',
  // 'secheading',
  'table-wrap',
  // 'toc-entry/title/xref',
  'back',
  'alternatives',
  'tex-math',
  'title-group',
  'ref',
  'cite-group'
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
    if (elementProcessor[xmlnode.tagName])
      elementProcessor[xmlnode.tagName](xmldoc, htmldoc, htmlParentNode, xmlnode);
    // else we drop/ignore the node
  };


module.exports = recurseTheDom;
