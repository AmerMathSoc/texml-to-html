const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: @style', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const style = document.querySelector('[data-ams-style]');
  t.ok(style, 'Element with data-ams-style attribute');
});

