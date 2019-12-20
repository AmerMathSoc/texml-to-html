const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: ext-link', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const extlink = document.querySelector('a[href="https://"]');
  t.ok(extlink, 'Element ext-link becomes a with href');
});

