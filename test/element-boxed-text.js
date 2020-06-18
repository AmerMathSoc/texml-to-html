const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: boxed-text', async function(t) {
  t.plan(1);
  const input = path.resolve(
    __dirname,
    'article.xml'
  );
  const document = await xsltproc(input);
  const boxedText = document.querySelector('div[data-ams-style="boxed"]');
  t.ok(boxedText, 'boxed-text as div with data-ams-style="boxed"');
});
