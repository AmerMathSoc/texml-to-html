const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: @hidden', async function(t) {
  t.plan(1);
  const document = article;
  const hiddenEl = document.querySelector('[hidden]');
  t.ok(hiddenEl, 'Element with hidden attribute');
});

