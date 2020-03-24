const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('setHead()', async function(t) {
  t.plan(5);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const metaCharset = document.head.firstElementChild;
  t.equal(metaCharset.tagName, 'META', 'first Child of head is a meta tag');
  t.equal(metaCharset.getAttribute('http-equiv'), 'Content-Type', 'first Child of head is meta charset with http-equiv');
  t.equal(metaCharset.getAttribute('content'), 'text/html; charset=utf-8', 'first Child of head is meta charset with contnt');
  // TODO switch to modern charset tag and add viewport (once JS lands)
  // t.equal(metaCharset.tagName, 'META', 'first Child of head is a meta tag');
  // t.equal(metaCharset.getAttribute('charset'), 'utf-8', 'first Child of head is meta charset with charset="utf-8"');
  // const viewport = document.head.querySelector('meta[name="viewport"][content="width=device-width"]');
  // t.ok(viewport);
  // t.equal(document.title, 'article-title', 'title tag is set');
  t.equal(document.querySelector('html').getAttribute('lang'), 'en', 'Language attribute on html tag');

  const input2 = path.resolve(__dirname, 'article--alttitle.xml');
  const document2 = await xsltproc(input2);
  t.equal(document2.querySelector('html').getAttribute('lang'), 'fr', 'Language attribute on html tag (not the default)');
});
