const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: monospace', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'element-monospace.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('span[data-ams-style="monospace"]'), 'Monospace as span with data-ams-style attribute');
});
