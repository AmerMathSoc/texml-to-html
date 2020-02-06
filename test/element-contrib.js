const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: contrib', async function(t) {
  t.plan(10);
  const input = path.resolve(
    __dirname,
    'article.xml'
  );
  const document = await xsltproc(input);
  const contrib = document.querySelector('dl[data-ams-doc-contrib="contribA"]');
  t.ok(contrib, 'contrib creates dl with data-ams-doc-contrib of type');
  const name = contrib.firstElementChild;
  t.equal(name.tagName, 'DT', 'dl has dt for (contributor) name as firstElementChild');
  t.equal(name.getAttribute('data-ams-doc-contrib'), 'contribA name', 'dt (name) has data-ams-doc-contrib with contrib-typ and "name"');
  t.equal(name.innerHTML, 'Given&nbsp;Sur', 'dt(name) gets content from name, given-name, surname');
  const aff = name.nextElementSibling;
  t.equal(aff.outerHTML, '<dd>aff</dd>', 'nextSibling is DD with aff data');
  const email = aff.nextElementSibling;
  t.equal(email.outerHTML, '<dd><a href="mailto://email">email</a></dd>', 'nextSibling is DD with email');
  const uri = email.nextElementSibling;
  t.equal(uri.outerHTML, '<dd><a href="uri">Homepage</a></dd>', 'nextSibling is DD with uri');
  const mr = uri.nextElementSibling;
  t.equal(mr.outerHTML, '<dd><a href="mrauthid">MathSciNet</a></dd>', 'nextSibling is MR author ID content');
  const orcid = mr.nextElementSibling;
  t.equal(orcid.outerHTML, '<dd><a href="orcidid">ORCID</a></dd>', 'nextSibling is orcidID content');

  const input2 = path.resolve(__dirname, 'book.xml');
  const document2 = await xsltproc(input);


  t.equal(document2.querySelectorAll('dt').length, document2.querySelectorAll('dt+dd').length, 'every DT has a consecutive DD');
});
