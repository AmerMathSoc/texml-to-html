
const { article } = require('./helper.js');
const tape = require('tape');


tape('Fig with attrib', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('figure#figattrib figcaption span'), 'attrib in figcaption');
});

