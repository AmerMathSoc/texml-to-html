const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: article-citation', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'element-article-citation.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('li code[data-ams-doc="amsref"]'), 'article-citation as li containing code with data-ams-doc amsref');
});

