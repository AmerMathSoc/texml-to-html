const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: p, nested paragraphs', async function(t) {
  t.plan(3);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('p#pid1 > span[data-ams-doc="paragraph"]'), 'nested pargraph becomes span with data-ams-doc paragraph')
  t.ok(document.querySelector('dl#pid2 > div > dd > p'), 'paragraph inside def-list stays paragraph')
  t.ok(document.querySelector('#pid3 > span[data-ams-doc="paragraph"]'), 'paragraph in footnotes becomes span with data-ams-doc paragraph')
});

