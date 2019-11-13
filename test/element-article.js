const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: article', async function(t) {
  t.plan(42);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.ok(document.head, 'document head');
  t.equal(document.title, 'article-title', 'article-title to title');

  const titlepage = document.querySelector('section[data-ams-doc="titlepage"]');
  t.ok(titlepage, 'section with data-ams-doc=titlepage');

  const header = titlepage.firstElementChild;
  t.equal(header.tagName, 'HEADER', 'titlepage header');

  const journalinfo = header.firstElementChild;
  t.equal(journalinfo.tagName, 'ASIDE', 'journalinfo aside');
  t.equal(journalinfo.getAttribute('data-ams-doc'), 'journal', 'journalinfo has data-ams-doc journal');

  const journaltitle = journalinfo.firstElementChild;
  t.equal(journaltitle.tagName, 'P', 'journaltitle paragraph');
  t.equal(journaltitle.getAttribute('data-ams-doc'), 'journal title', 'journaltitle has data-ams-doc "journal title"');
  t.equal(journaltitle.innerHTML, 'journal-title', 'journaltitle content from journal-meta//journal-article');

  const journalloc = journaltitle.nextElementSibling;
  t.equal(journalloc.tagName, 'P', 'journallocation paragraph');
  t.equal(journalloc.getAttribute('data-ams-doc'), 'journal location', 'journallocation has data-ams-doc "journal location"');
  const jvol = journalloc.firstElementChild;
  t.equal(jvol.tagName, 'SPAN', 'journal volume span');
  t.equal(jvol.getAttribute('data-ams-doc'), 'journal volume', 'journal volume data-ams-doc "journal volume"');
  t.equal(jvol.innerHTML, 'Volume volume, ', 'journal volume content from article-meta/volume');
  const jissue = jvol.nextElementSibling;
  t.equal(jissue.tagName, 'SPAN', 'journal issue span');
  t.equal(jissue.getAttribute('data-ams-doc'), 'journal issue', 'journal issue data-ams-doc "journal issue"');
  t.equal(jissue.innerHTML, 'Issue issue', 'journal volume content from article-meta/volume');
  const jdate = jissue.nextElementSibling;
  t.equal(jdate.tagName, 'SPAN', 'journal date span');
  t.equal(jdate.getAttribute('data-ams-doc'), 'journal date', 'journal date data-ams-doc "journal date"');
  t.equal(jdate.innerHTML, '(2000-04-13)', 'journal date content from article-meta/pubdate');
  t.notOk(jdate.nextElementSibling, 'journal date last child of journal volume');

  const jpii = journalloc.nextElementSibling;
  t.equal(jpii.tagName, 'P', 'journal pii paragraph');
  t.equal(jpii.getAttribute('data-ams-doc'), 'journal pii', 'journal pii with data-ams-doc "journal pii"');
  const doilink = jpii.firstElementChild;
  t.equal(doilink.tagName, 'A', 'doilink anchor');
  t.equal(doilink.href, 'https://doi.org/doi', 'doilink with href from article-id@pub-id-type=doi');
  t.equal(doilink.innerHTML, 'pii', 'doilink with content from article-id@pub-id-type=pii');
  t.notOk(doilink.nextElementSibling, 'doilink last child of journal pii');

  t.notok(jpii.nextElementSibling, 'journal pii last child of journal volume');

  const titlepageheading = journalinfo.nextElementSibling;
  t.equal(titlepageheading.tagName, 'H1', 'titlepage heading');
  t.equal(titlepageheading.innerHTML, 'article-title', 'titlepage heading content from article-title');

  const dedication = titlepageheading.nextElementSibling;
  t.equal(dedication.outerHTML, '<div role="doc-dedication"></div>', 'dedication following titlepage heading');
  t.notOk(dedication.nextElementSibling, 'dedication is last child of titlepage header');

  const abstract = header.nextElementSibling;
  t.equal(abstract.outerHTML, '<section data-ams-doc-level="2" role="doc-abstract"></section>', 'abstract following titlepage header');
  t.notOk(abstract.nextElementSibling, 'abstract last child of titlepage');

  const articlemeta = titlepage.nextElementSibling;
  t.equal(articlemeta.getAttribute('data-ams-doc'), 'copyright-page', 'copyright-page following abstract');

  const article = articlemeta.nextElementSibling;
  t.equal(article.tagName, 'SECTION', 'section for article');
  t.equal(article.getAttribute('data-ams-doc'), 'article', 'section for article with data-ams-doc article');
  const articletitle = article.firstElementChild;
  t.equal(articletitle.tagName, 'H1', 'article first child is heading');
  t.equal(articletitle.innerHTML, 'article-title', 'article heading content from article-title');
  t.equal(articletitle.nextElementSibling.getAttribute('data-ams-doc'), 'section', 'articletitle followed by body/sec');

  t.notOk(article.nextElementSibling, 'article last child of body')

  const input2 = path.resolve(__dirname, 'element-article--alttitle.xml');
  const document2 = await xsltproc(input2);
  t.equal(document2.title, 'alttitle', 'alttitle');
});
