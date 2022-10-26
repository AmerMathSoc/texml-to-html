
import { article, articleNometa } from './helper.js';
import tape from 'tape';


tape('setHead()', async function (t) {
  t.plan(5);
  const document = article;
  t.equal(document.head.firstChild, document.head.querySelector('meta[charset="utf-8"]'), 'First child of head is a meta tag');
  t.ok(document.head.querySelector('meta[content="width=device-width, initial-scale=1"][name="viewport"]'), 'viewport metatag');
  t.equal(document.documentElement.getAttribute('lang'), 'en', 'Language attribute on html tag');
  t.equal(document.documentElement.getAttribute('dir'), 'ltr', 'Directionality attribute on html tag');

  const document2 = articleNometa;
  t.equal(document2.querySelector('html').getAttribute('lang'), 'fr', 'Language attribute on html tag (not the default)');
});
