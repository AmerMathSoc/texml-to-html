
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: sc', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('span[data-ams-style="sc"]'), 'SC as span with data-ams-style attribute');
});

