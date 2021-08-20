
const { article } = require('./helper.js');
const tape = require('tape');

tape('Template: boxed-text', async function(t) {
  t.plan(1);
  const document = article;
  const boxedText = document.querySelector('div[data-ams-style="boxed"]');
  t.ok(boxedText, 'boxed-text as div with data-ams-style="boxed"');
});
