const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: @position', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const qedboxEl = document.querySelector('[data-ams-qed-box]');
  t.ok(qedboxEl, 'Element with data-ams-qed-box attribute');
});

