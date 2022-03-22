
import { article, book } from './helper.js';
import tape from 'tape';


tape('Template: x', async function(t) {
  t.plan(4);
  const document = article;
  t.equal(document.querySelector('a[href="#rid5"][data-ams-ref="type"]').innerHTML, 'Context ref', 'xref with generic type with x child preserved');
  t.equal(document.querySelector('cite a[href="#rid4"][data-ams-ref="bibr"][role="doc-biblioref"]').innerHTML, 'ref, note', 'xref with ref-type bibr with x child preserve');
  t.equal(document.querySelector('p#pwithx').innerHTML, 'Is  ignored.', 'x in article is ignored');
  const document2 = book;
  t.equal(document2.querySelector('p#pwithx').innerHTML, 'Is not ignored.', 'x in book is preserved');
});
