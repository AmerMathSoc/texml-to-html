const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Empty Labels should be stripped', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelector('#emptyLabel').innerHTML.trim(), '', 'Statement with no title and empty label');
  t.equal(document.querySelector('#titleEmptyLabel').innerHTML.trim(), '<h3>Title. </h3>', 'Statement with no title and empty label');
});
