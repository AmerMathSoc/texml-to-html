const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: book-meta', async function(t) {
  t.plan(18);

  const input = path.resolve(__dirname, 'book.xml');
  const document = await xsltproc(input);
  const titlepage = document.querySelector('section[data-ams-doc="titlepage"]');
  t.ok(titlepage, 'book-meta creates section with data-ams-doc=titlepage');
  const booktitlegroup = titlepage.firstElementChild;
  t.equal(booktitlegroup.tagName, 'HEADER', 'titlepage first child is header book-title-group');
  const series = booktitlegroup.nextElementSibling;
  t.equal(series.tagName, 'SPAN', 'titlegroup next sibling is span for book series');
  t.equal(series.innerHTML, 'series', 'series content from book-id@book-id-type=publ_key');
  const volume = series.nextElementSibling;
  t.equal(volume.tagName, 'SPAN', 'series next sibling is span for book volume');
  t.equal(volume.innerHTML, 'volume', 'volume content from book-volume-number');
  const contribswrapper = volume.nextElementSibling;
  t.equal(contribswrapper.tagName, 'DL', 'Wrapping dl for contrib-groups');
  t.ok(contribswrapper.firstElementChild, 'contrib groups create some nodes');

  t.equal(document.querySelectorAll('dd[data-ams-doc-contrib]').length, 2, 'number of contrib-group DLs');

  const footer = contribswrapper.nextElementSibling;
  t.equal(footer.tagName, 'FOOTER', 'Wrapping footer for publisher and permissions');
  const publisherlist = footer.firstElementChild;
  t.equal(publisherlist.tagName, 'DL', 'Wrapping dl for publishers\' info');
  const publishedBy = publisherlist.firstElementChild
  t.equal(publishedBy.outerHTML, '<dt>Published by</dt>', 'dt "Published By"');
  const publisher = publishedBy.nextElementSibling;
  t.equal(publisher.tagName, 'DD', 'publisher template called');
  const publisher2 = publisher.nextElementSibling;
  t.equal(publisher2.tagName, 'DD', 'publisher template called');
  t.notOk(publisher2.nextElementSibling, 'publisher is last child of list');

  const copyright = publisherlist.nextElementSibling;
  t.equal(copyright.tagName, 'P', 'list of publishers followed by p from copyright-statment template');

  t.notOk(copyright.nextElementSibling, 'copyright-statement last child of footer');
  t.notOk(footer.nextElementSibling, 'footer last child of titlepage');

});
