import { article, book } from './helper.js';
import tape from 'tape';

tape('Template: copyright-statement', async function(t) {
  t.plan(2);
  const document = article;
  const article_copyright = document.querySelector(
    'section[data-ams-doc="copyright-page"] dt+dd[data-ams-doc="copyright"]'
  );
  t.equal(
    article_copyright.previousElementSibling.outerHTML,
    '<dt>Copyright Information</dt>',
    'copyright-statement (in permissions in article-meta) creates DT with content'
  );
  t.ok(
    article_copyright,
    'copyright-statement (in permissions in article-meta) creates DD with data-ams-doc copyright'
  );
});
