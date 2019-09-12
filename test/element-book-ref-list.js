const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: book-back/ref-list ', async function(t) {
  t.plan(3);

  const input = path.resolve(__dirname, 'element-book-ref-list.xml');
  const document = await xsltproc(input);
  const bibl = document.querySelector('section#id[data-ams-doc-level="1"][role="doc-bibliography"]');
  t.ok(bibl, 'ref-list becomes section with id, role, doc-level');
  const title = bibl.firstElementChild;
  t.equal(title.outerHTML, '<h1>title</h1>', 'ref-list title as heading');
  const list = title.nextElementSibling;
  t.equal(list.tagName, 'DL', 'dl created for ref items');
});
