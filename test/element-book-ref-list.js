const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: book-back/ref-list ', async function(t) {
  t.plan(4);

  const input = path.resolve(__dirname, 'book.xml');
  const document = await xsltproc(input);
  const bibl = document.querySelector('section#reflist[role="doc-bibliography"]');
  t.ok(bibl, 'ref-list becomes section with id, role, doc-level');
  const title = bibl.querySelector('h1');
  t.equal(title.outerHTML, '<h1>title</h1>', 'ref-list title as heading');
  const list = bibl.querySelector('dl');
  t.ok(list, 'dl created for ref items');
  t.ok(document.querySelector('section#reflistchapter [role="doc-bibliography"] h2'), 'Chapter-level ref-list title gets h2')
});
