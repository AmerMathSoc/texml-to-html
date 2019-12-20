const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: string-name', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const span =  document.querySelector('span[data-ams-doc="stringname"]');
  t.ok(span, 'stringname', 'Stringname data-ams-doc attribute');
});

