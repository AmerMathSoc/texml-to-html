
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: ext-link', async function(t) {
  t.plan(1);
  const document = article;
  const extlink = document.querySelector('a[href="https://"]');
  t.ok(extlink, 'Element ext-link becomes a with href');
});

