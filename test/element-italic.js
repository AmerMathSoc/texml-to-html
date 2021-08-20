
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: italic', async function(t) {
  t.plan(2);
  const document = article;
  t.ok(document.querySelector('i'), 'Italic as i');
  t.ok(document.querySelector('em'), 'Italic with toggle=yes as em');
});

