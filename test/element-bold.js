const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: bold', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('strong'), 'Bold as strong');
});

