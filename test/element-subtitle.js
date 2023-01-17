
import { article, articleAlttitle } from './helper.js';
import tape from 'tape';

tape('subtitle', async function (t) {
  t.plan(3);
  const document = article;

  const subtitle = document.querySelector('p[data-ams-doc="subtitle"]');
  t.ok(subtitle, 'section subtitle to p with data-ams-doc');

  const document2 = articleAlttitle;
  const articleSubtitle = document2.querySelector('p[data-ams-doc="subtitle"]');
  t.equal(
    articleSubtitle.previousElementSibling.tagName, 'H1',
    'article-level subtitle in content follows title'
  );
  const jsonData = JSON.parse(document2.querySelector('script[type="application/json"]').textContent);
  t.equal(jsonData.subtitle, articleSubtitle.innerHTML, 'article-level subtitle in metadata matches in content');
});
