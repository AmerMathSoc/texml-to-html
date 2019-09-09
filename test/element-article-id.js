const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: article-id', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'element-article-id.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelectorAll('section[data-ams-doc="article"] li')[0].innerHTML.trim(), 'DOI <a href="https://doi.org/doi">doi</a>', 'article-id with pub-id-type=DOI to li with link');
  t.equal(document.querySelectorAll('section[data-ams-doc="article"] li')[1].innerHTML.trim(), '<a href="http://www.ams.org/mathscinet-getitem?mr=mr">MathSciNet Review</a>', 'article-id with pub-id-type=DOI to li with link');
});

