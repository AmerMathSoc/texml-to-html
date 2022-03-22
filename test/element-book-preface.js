
import { book } from './helper.js';
import tape from 'tape';

tape('Template: book preface', async function(t) {
  t.plan(3);

  const document = book;
  const preface = document.querySelector('section[role="doc-preface"]');
  t.ok(preface, 'preface as section with role doc-preface');
  t.equal(preface.id, 'preface', 'preface preserves ID');
  t.ok(preface.querySelector('h1'), 'Preface title should become an h1');
});
