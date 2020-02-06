const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('subtitle', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);

  const subtitle = document.querySelector('p[data-ams-doc="subtitle"]');
  t.ok(subtitle, 'subtitle to p with data-ams-doc');
  t.equal(
    subtitle.getAttribute('data-ams-doc-level'),
    subtitle.previousElementSibling.tagName.substring(1),
    'subtitle gets correct data-ams-doc-level'
  );
});
