const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: @style', async function(t) {
  t.plan(1);
  const document = article;
  const style = document.querySelector('[data-ams-style]');
  t.ok(style, 'Element with data-ams-style attribute');
});

