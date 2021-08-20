const { article, book } = require('./helper.js');
const tape = require('tape');

tape('Template: copyright-statement', async function(t) {
  t.plan(3);
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
  const document2 = book;
  t.ok(
    document2.querySelector('p[data-ams-doc="book copyright"]'),
    'copyright-statement (in permissions in book-meta) li with a attributes and content'
  );
});
