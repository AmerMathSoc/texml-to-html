const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: italic', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'element-italic.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('i'), 'Italic as i');
  t.ok(document.querySelector('em'), 'Italic with toggle=yes as em');
});

