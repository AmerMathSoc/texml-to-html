const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: book', async function(t) {
  t.plan(5);

  const input = path.resolve(__dirname, 'book.xml');
  const document = await xsltproc(input);

  const head = document.head;
  t.ok(head, 'document head created');
  t.ok(document.querySelector('head meta[name="viewport"][content="width=device-width"]'), 'meta tag viewport');
  t.equal(document.title, 'title', 'document title from book-title');
  t.ok(document.body.querySelector('section[data-ams-doc="titlepage"]'), 'document body has titlepage');
  t.ok(document.body.querySelector('section[role="doc-chapter"]'), 'document body has chapter');

});
