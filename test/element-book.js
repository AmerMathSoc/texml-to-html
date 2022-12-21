
import { book } from './helper.js';
import tape from 'tape';

tape('Template: book', async function(t) {
  t.plan(5);

  const document = book;

  const head = document.head;
  t.ok(head, 'document head created');
  t.ok(document.querySelector('head meta[name="viewport"][content="width=device-width, initial-scale=1"]'), 'meta tag viewport');
  t.equal(document.title, 'title', 'document title from book-title');
  t.ok(document.body.querySelector('section[data-ams-doc="titlepage"]'), 'document body has titlepage');
  t.ok(document.body.querySelector('section[role="doc-chapter"]'), 'document body has chapter');

});
