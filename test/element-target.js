const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: target', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const targetSpan = document.querySelector('section[data-ams-doc="article"] span#target');
  t.ok(targetSpan, 'Convert to span inside article');
});

