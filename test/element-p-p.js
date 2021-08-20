
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: p, nested paragraphs', async function(t) {
  t.plan(3);
  const document = article;
  t.ok(document.querySelector('p#pid1 > span[data-ams-doc="paragraph"]'), 'nested pargraph becomes span with data-ams-doc paragraph')
  t.ok(document.querySelector('dl#pid2 > div > dd > p'), 'paragraph inside def-list stays paragraph')
  t.ok(document.querySelector('#pid3 > span[data-ams-doc="paragraph"]'), 'paragraph in footnotes becomes span with data-ams-doc paragraph')
});

