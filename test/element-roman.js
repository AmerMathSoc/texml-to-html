const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: roman', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('span[data-ams-style="roman"]'), 'Roman as span with data-ams-style attribute');
});

