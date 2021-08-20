
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: article-id', async function(t) {
  t.plan(2);
  const document = article;
  t.equal(document.querySelector('li a[href^="https://doi.org/"]').parentNode.innerHTML.trim(), 'DOI <a href="https://doi.org/doi">doi</a>', 'article-id with pub-id-type=DOI to li with link');
  t.equal(document.querySelector('li a[href^="http://www.ams.org/mathscinet-getitem?mr="]').outerHTML.trim(), '<a href="http://www.ams.org/mathscinet-getitem?mr=mr">MathSciNet Review: mr</a>', 'article-id with pub-id-type=MR to li with link');
});
