
import { article } from './helper.js';
import tape from 'tape';


tape('Template: fn, fn/label', async function(t) {
  t.plan(8);
  const document = article;
  const footnote = document.querySelector('div[role="doc-footnote"]');
  t.ok(footnote, 'fn becomes div with role doc-footnote');
  t.equal(footnote.getAttribute('aria-label'), 'Footnote Label', 'footnote aria-label attribute');
  const footnoteLabel = footnote.firstElementChild;
  t.equal(footnoteLabel.tagName, 'SPAN', 'footnote label');
  t.equal(footnoteLabel.getAttribute('data-ams-doc'), 'label', 'footnote label data attribute');
  t.equal(footnoteLabel.innerHTML, '<sup>Label</sup>', 'footnote label content');
  t.notOk(document.querySelector('#fnid').closest('p'), 'footnote moved out of paragraph')
  
  const parWithFootnotes = document.querySelector('#multifootnotes');
  const fn3 = document.querySelector('div#fnid3[role="doc-footnote"]');
  const fn4 = document.querySelector('div#fnid4[role="doc-footnote"]');
  t.equal(parWithFootnotes.nextElementSibling, fn3, 'Paragraph with multiple footnotes followed by first footnote');
  t.equal(fn3.nextElementSibling, fn4, 'Paragraph with multiple footnotes: first footnote followed by second footnote');
});

