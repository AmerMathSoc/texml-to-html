const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: article-id', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'element-article-meta.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelector('li a[href^="https://doi.org/"]').parentNode.innerHTML.trim(), 'DOI <a href="https://doi.org/doi">doi</a>', 'article-id with pub-id-type=DOI to li with link');
  t.equal(document.querySelector('li a[href^="http://www.ams.org/mathscinet-getitem?mr="]').outerHTML.trim(), '<a href="http://www.ams.org/mathscinet-getitem?mr=mr">MathSciNet Review</a>', 'article-id with pub-id-type=MR to li with link');
});
