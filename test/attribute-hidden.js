const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: @hidden', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const hiddenEl = document.querySelector('[hidden]');
  t.ok(hiddenEl, 'Element with hidden attribute');
});

