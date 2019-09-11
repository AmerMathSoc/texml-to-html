const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Element: article-meta', async function(t) {
  t.plan(15);
  const input = path.resolve(__dirname, 'element-article-meta.xml');
  const document = await xsltproc(input);
console.log(document.body.innerHTML);
  const copyrightpage = document.querySelector('section[data-ams-doc="copyright-page"]');
  t.ok (copyrightpage, 'article-meta creates wrapping section with data-ams-doc=copyright-page');
  t.equal(copyrightpage.firstElementChild.outerHTML, '<h2>Article Information</h2>', 'copyright page heading');
  const dl = copyrightpage.querySelector('dl');
  t.ok(dl, 'Wrapping dl for metadata');
  t.equal(dl.querySelector('dt').innerHTML, 'Keywords', 'dl with first dt having "Keywords"');
  t.equal(dl.querySelectorAll('dt')[1].innerHTML, ' Information', 'dl with second dt with generated content');
  t.equal(dl.querySelectorAll('dt')[1].nextElementSibling.tagName, 'DD', 'dl, second dt followed by dd');
  t.ok(dl.querySelectorAll('dt')[2], 'dl with third dt from custom-meta-group');
  t.equal(dl.querySelectorAll('dt')[2].nextElementSibling.tagName, 'DD', 'dl with third dt followed by DT');
  t.equal(dl.querySelectorAll('dt')[3].innerHTML, 'Journal Information', 'dl with fourth dt with content');
  t.equal(dl.querySelectorAll('dt')[3].nextElementSibling.tagName, 'DD', 'dl, fourth dt followed by dd');
  t.equal(dl.querySelectorAll('dt')[4].innerHTML, 'Publication History', 'dl with fifth dt with content');
  t.equal(dl.querySelectorAll('dt')[4].nextElementSibling.tagName, 'DD', 'dl, fifth dt followed by dd');
  t.equal(dl.querySelectorAll('dt')[5].innerHTML, 'Article References', 'dl with fifth dt with content');
  t.equal(dl.querySelectorAll('dt')[5].nextElementSibling.tagName, 'DD', 'dl, fifth dt followed by dd');
  t.equal(dl.querySelectorAll('dt')[5].nextElementSibling.firstElementChild.tagName, 'UL', 'dl, fifth dt followed by dd with ul');
});

