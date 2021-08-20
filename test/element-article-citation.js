
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: article-citation', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('li code[data-ams-doc="amsref"]'), 'article-citation as li containing code with data-ams-doc amsref');
});

