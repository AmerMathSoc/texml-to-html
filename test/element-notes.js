import { article, articleAlttitle, book } from './helper.js';
import tape from 'tape';

tape('Template: front/notes@notes-type=dedication', async function (t) {
  t.plan(3);

  const document = article;
  t.ok(
    document.querySelector('section[role="doc-dedication"]'),
    'notes with notes-type dedication creates section with role doc-dedication'
  );

  const document2 = book;
  t.ok(
    document2.querySelector(
      'section[data-ams-specific-use="epub-opening-page"][data-ams-content-type="publishers-note"][data-ams-doc-level="0"]'
    ),
    'notes creates section with data-ams attributes'
  );

  const document3 = articleAlttitle;
  t.ok(
    document3.querySelector('section[data-ams-doc="notes"][data-ams-content-type="article"]'),
    'notes with notes-type article'
  );
});
