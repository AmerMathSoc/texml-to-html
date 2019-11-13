const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: copyright-statement', async function(t) {
  t.plan(3);
  const input = path.resolve(
    __dirname,
    'element-article-meta.xml'
  );
  const document = await xsltproc(input);
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
  const input2 = path.resolve(
    __dirname,
    'element-copyright-statement--book.xml'
  );
  const document2 = await xsltproc(input2);
  t.ok(
    document2.querySelector('p[data-ams-doc="book copyright"]'),
    'copyright-statement (in permissions in book-meta) li with a attributes and content'
  );
});
