
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: fn, fn/label', async function(t) {
  t.plan(5);
  const document = article;
  const footnote = document.querySelector('div[role="doc-footnote"]');
  t.ok(footnote, 'fn becomes div with role doc-footnote');
  const footnoteLabel = footnote.firstElementChild;
  t.equal(footnoteLabel.tagName, 'SPAN', 'footnote label');
  t.equal(footnoteLabel.getAttribute('data-ams-doc'), 'label', 'footnote label data attribute');
  t.equal(footnoteLabel.innerHTML, 'Label', 'footnote label content');
  t.notOk(document.querySelector('#fnid').closest('p'), 'footnote moved out of paragraph')
});

