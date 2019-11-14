const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: back/app-group, back/app-group/app', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const appgroup = document.querySelector('section[role="doc-appendix"]');
  const app = appgroup.querySelector('section[data-ams-doc-level="1"]');
  t.ok(appgroup, 'appgroup element');
  t.ok(app, 'app element');
});

