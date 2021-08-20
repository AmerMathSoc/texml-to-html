const { article, book } = require('./helper.js');
const tape = require('tape');

tape('Template: front/notes@notes-type=dedication', async function (t) {
  t.plan(2);

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
});
