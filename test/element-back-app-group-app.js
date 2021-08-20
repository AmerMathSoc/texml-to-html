
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: back/app-group, back/app-group/app', async function(t) {
  t.plan(1);
  const document = article;
  const app = document.querySelector('section[role="doc-appendix"][data-ams-doc-level="1"]');
  t.ok(app, 'app element');
});

