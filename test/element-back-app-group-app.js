const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: back/app-group, back/app-group/app', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const app = document.querySelector('section[role="doc-appendix"][data-ams-doc-level="1"]');
  t.ok(app, 'app element');
});

