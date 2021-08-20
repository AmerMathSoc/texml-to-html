
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: sans-serif', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('span[data-ams-style="sans-serif"]'), 'Sans-serif as span with data-ams-style attribute');
});

