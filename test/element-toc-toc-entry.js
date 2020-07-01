const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: (book) toc, toc-entry', async function(t) {
  t.plan(11);
  const input = path.resolve(__dirname, 'book.xml');
  const document = await xsltproc(input);

  const toc = document.querySelector('nav[role="doc-toc"]');
  t.ok(toc, 'toc: wrapping nav element with role=doc-toc');
  const title = document.querySelector('nav[role="doc-toc"] h1'); // NOTE xslt will have nav>h1, JS will have nav>header>h1
  t.ok(title, 'toc: title-group passthrough, title becomes heading');
  const list = toc.querySelector('ol');
  t.ok(list, 'toc: ordered list');
  t.equal(list.children.length, 4, 'Nested toc-entries remain nested')
  t.equal(
    list.querySelector('li a[href="#tocid1"]').innerHTML,
    'Chunk',
    'toc-entry and nav-pointer'
  );
  t.equal(
    list.querySelector('li a[href="#tocid2"]').innerHTML,
    '2. Chunk',
    'toc-entry, label, nav-pointer'
  );
  t.equal(list.querySelector('ol').children.length, 1, 'Doubly nested toc-entries remain nested');
  t.equal(
    list.querySelector('li a[href="#tocid2"]+ol li a[href="#tocid3"]').innerHTML,
    '1. SubChunk',
    'Nested toc-entry, label, nav-pointer'
  );
  t.equal(
    list.querySelector('li a[href="#tocid4"]').innerHTML,
    '1. SubSubChunk with Link',
    'toc-entry with xref in title'
  );
  t.equal(
    list.querySelector('li a[href="#tocid5"]').innerHTML,
    'Alt title',
    'toc-entry with alt-title'
  );
  t.equal(
    list.querySelector('li a[href="#tocid6"]').innerHTML,
    'Chunk without label but subchunk with label',
    'toc-entry without label but sub-entry with label'
  );
});
