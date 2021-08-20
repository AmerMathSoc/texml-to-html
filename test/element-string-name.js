const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: string-name', async function(t) {
  t.plan(1);
  const document = article;
  const span =  document.querySelector('span[data-ams-doc="stringname"]');
  t.ok(span, 'stringname', 'Stringname data-ams-doc attribute');
});

