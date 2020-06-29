const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: front/notes@notes-type=dedication', async function (t) {
  t.plan(2);

  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.ok(
    document.querySelector('section[role="doc-dedication"]'),
    'notes with notes-type dedication creates section with role doc-dedication'
  );

  const input2 = path.resolve(__dirname, 'book.xml');
  const document2 = await xsltproc(input2);
  t.ok(
    document2.querySelector(
      'section[data-ams-specific-use="epub-opening-page"][data-ams-content-type="publishers-note"][data-ams-doc-level="0"]'
    ),
    'notes creates section with data-ams attributes'
  );
});
