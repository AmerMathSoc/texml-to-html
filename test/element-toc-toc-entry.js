const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: toc, toc-entry', async function(t) {
  t.plan(6);
  const input = path.resolve(__dirname, 'element-toc-toc-entry.xml');
  const document = await xsltproc(input);

  const toc = document.querySelector('nav[role="doc-toc"]');
  t.ok(toc, 'toc: wrapping nav element with role=doc-toc');
  const title = document.querySelector('nav[role="doc-toc"]>h1');
  t.ok(title, 'toc: title-group passthrough, title becomes heading');
  const list = toc.querySelector('ol');
  t.ok(list, 'toc: ordered list');
  t.equal(
    list.querySelector('li a[href="#id1"]').innerHTML,
    'Chunk',
    'toc-entry and nav-pointer'
  );
  t.equal(
    list.querySelector('li a[href="#id2"]').innerHTML,
    '2. Chunk',
    'toc-entry, label, nav-pointer'
  );
  t.equal(
    list.querySelector('li a[href="#id2"]+ol li a[href="#id3"]').innerHTML,
    '1. SubChunk',
    'Nested toc-entry, label, nav-pointer'
  );
});
