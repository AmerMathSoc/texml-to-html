const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: bold', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'element-bold.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('strong'), 'Bold as strong');
});

