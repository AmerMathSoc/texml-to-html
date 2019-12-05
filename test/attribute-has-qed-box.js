const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: @has-qed-box', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const qedboxEl = document.querySelector('[data-ams-qed-box]');
  t.ok(qedboxEl, 'Element with data-ams-qed-box attribute');
  t.notOk(document.querySelector('[data-ams-doc="math inline"][data-ams-qed-box]'), 'has-qed-box ignored on inline-formula');
});

