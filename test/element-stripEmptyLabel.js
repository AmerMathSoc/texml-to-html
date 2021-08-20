
const { article } = require('./helper.js');
const tape = require('tape');

tape('Empty Labels should be stripped', async function(t) {
  t.plan(2);
  const document = article;
  t.equal(document.querySelector('#emptyLabel').innerHTML.trim(), '', 'Statement with no title and empty label');
  t.equal(document.querySelector('#titleEmptyLabel').innerHTML.trim(), '<figcaption>Title. </figcaption>', 'Statement with no title and empty label');
});
