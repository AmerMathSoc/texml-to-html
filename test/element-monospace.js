
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: monospace', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('span[data-ams-style="monospace"]'), 'Monospace as span with data-ams-style attribute');
});

