const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: @id', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'attribute-id.xml');
  const document = await xsltproc(input);
  const id = document.querySelector('[id]');
  t.ok(id, 'Element with id attribute');
});

