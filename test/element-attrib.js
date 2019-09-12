const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: attrib', async function(t) {
  t.plan(3);
  const input = path.resolve(__dirname, 'element-attrib.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('span'), 'attrib to span');
  t.notOk(document.querySelector('figure#id1 *'), 'attrib in fig ignored');
  t.ok(document.querySelector('figure#id2 figcaption span'), 'attrib in figcaption');
});

