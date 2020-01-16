const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: book preface', async function(t) {
  t.plan(3);

  const input = path.resolve(__dirname, 'book.xml');
  const document = await xsltproc(input);
  const preface = document.querySelector('section[role="doc-preface"]');
  t.ok(preface, 'preface as section with role doc-preface');
  t.equal(preface.id, 'preface', 'preface preserves ID');
  t.ok(preface.querySelector('h1'), 'Preface title should become an h1');
});
