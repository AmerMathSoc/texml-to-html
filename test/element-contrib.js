const { article, book } = require('./helper.js');
const tape = require('tape');

tape('Template: contrib', async function(t) {
  t.plan(11);
  const document = article;
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

  const document2 = book;
  t.equal(document2.querySelectorAll('dt').length, document2.querySelectorAll('dt+dd').length, 'every DT has a consecutive DD');
  t.equal(document2.querySelector('dt[data-ams-doc-contrib="contrib-type3 name"] span[data-ams-doc="stringname"]').innerHTML, 'String Name', 'Contributor with string-name')
});
