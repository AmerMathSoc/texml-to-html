const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Fig with attrib', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('figure#figattrib figcaption span'), 'attrib in figcaption');
});

