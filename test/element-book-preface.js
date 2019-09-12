const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: preface ', async function(t) {
  t.plan(1);

  const input = path.resolve(__dirname, 'element-book-preface.xml');
  const document = await xsltproc(input);
  const preface = document.querySelector('section[role="doc-preface"]');
  t.ok(preface, 'preface as section with role doc-prefaces');
});
