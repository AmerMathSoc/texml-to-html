const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: @rowspan, @colspan', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const td = document.querySelector('td#tdattributes');
  t.equal(td.getAttribute('colspan'), '1', 'colspan attribute');
  t.equal(td.getAttribute('rowspan'), '2', 'colspan attribute');
});

