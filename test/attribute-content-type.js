const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: @content-type', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const style = document.querySelector('[data-ams-content-type]');
  t.ok(style, 'Element with data-ams-content-type attribute');
});

