
import { article, articleNometa } from './helper.js';
import tape from 'tape';


tape('setHead()', async function(t) {
  t.plan(4);
  const document = article;
  const metaCharset = document.head.firstElementChild;
  t.equal(metaCharset.tagName, 'META', 'first Child of head is a meta tag');
  t.equal(metaCharset.getAttribute('charset'), 'utf-8', 'first Child of head is meta charset');
  // TODO switch to modern charset tag and add viewport (once JS lands)
  // t.equal(metaCharset.tagName, 'META', 'first Child of head is a meta tag');
  // t.equal(metaCharset.getAttribute('charset'), 'utf-8', 'first Child of head is meta charset with charset="utf-8"');
  // const viewport = document.head.querySelector('meta[name="viewport"][content="width=device-width"]');
  // t.ok(viewport);
  // t.equal(document.title, 'article-title', 'title tag is set');
  t.equal(document.querySelector('html').getAttribute('lang'), 'en', 'Language attribute on html tag');

  const document2 = articleNometa;
  t.equal(document2.querySelector('html').getAttribute('lang'), 'fr', 'Language attribute on html tag (not the default)');
});
