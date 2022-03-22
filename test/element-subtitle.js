
import { article, articleAlttitle } from './helper.js';
import tape from 'tape';

tape('subtitle', async function(t) {
  t.plan(4);
  const document = article;

  const subtitle = document.querySelector('p[data-ams-doc="subtitle"]');
  t.ok(subtitle, 'subtitle to p with data-ams-doc');
  t.equal(
    subtitle.getAttribute('data-ams-doc-level'),
    subtitle.previousElementSibling.tagName.substring(1),
    'subtitle gets correct data-ams-doc-level'
  );

  const document2 = articleAlttitle;
  const articleSubtitle = document2.querySelector('p[data-ams-doc="subtitle"]');
  t.ok(articleSubtitle, 'article-level subtitle');
  t.equal(
    articleSubtitle.previousElementSibling.tagName, 'H1',
    'article-level subtitle follows title'
  );
});
