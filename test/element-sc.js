const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: sc', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'element-sc.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('span[data-ams-style="sc"]'), 'SC as span with data-ams-style attribute');
});
