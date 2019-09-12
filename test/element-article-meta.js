const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: article-meta', async function(t) {
  t.plan(25);
  const input = path.resolve(__dirname, 'element-article-meta.xml');
  const document = await xsltproc(input);
  console.log(document.body.innerHTML)
  const copyrightpage = document.querySelector('section[data-ams-doc="copyright-page"]');
  t.ok (copyrightpage, 'article-meta creates wrapping section with data-ams-doc=copyright-page');
  t.equal(copyrightpage.firstElementChild.outerHTML, '<h2>Article Information</h2>', 'copyright page heading');
  const dl = copyrightpage.querySelector('dl');
  t.ok(dl, 'Wrapping dl for metadata');
  t.equal(dl.querySelector('dt').innerHTML, 'MSC ', 'dt with "MSC "');
  t.equal(dl.querySelectorAll('dt')[1].innerHTML, 'Keywords', 'dt with "Keywords"');
  t.equal(dl.querySelectorAll('dt')[2].innerHTML, ' Information', 'dt with generated content');
  t.equal(dl.querySelectorAll('dt')[2].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dl.querySelectorAll('dt')[3].innerHTML, ' Information', 'dt from contrib-group');
  t.equal(dl.querySelectorAll('dt')[3].nextElementSibling.tagName, 'DD', 'dd from contrib-group');
  t.ok(dl.querySelectorAll('dt')[3].nextElementSibling.hasAttribute('data-ams-doc-contrib'), 'dd from contrib-group has data-ams-doc-contrib');
  t.equal(dl.querySelectorAll('dt')[4].innerHTML, 'Additional Notes', 'dt from funding-group');
  t.equal(dl.querySelectorAll('dt')[4].nextElementSibling.tagName, 'DD', 'dd from funding-group');
  t.equal(dl.querySelectorAll('dt')[5].innerHTML, 'meta-name', 'dt from custom-meta-group');
  t.equal(dl.querySelectorAll('dt')[5].nextElementSibling.outerHTML, '<dd>meta-value</dd>', 'dd followed by dt from custom-meta-group');
  t.equal(dl.querySelectorAll('dt')[6].innerHTML, 'Journal Information', 'dt with "Journal Information"');
  t.equal(dl.querySelectorAll('dt')[6].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dl.querySelectorAll('dt')[7].innerHTML, 'Publication History', 'dt with "Publication History""');
  t.equal(dl.querySelectorAll('dt')[7].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dl.querySelectorAll('dt')[8].innerHTML, 'Copyright Information', 'dt with "Copyright Information""');
  t.equal(dl.querySelectorAll('dt')[8].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dl.querySelectorAll('dt')[8].nextElementSibling.getAttribute('data-ams-doc'), 'copyright', 'dt followed by dd with data-ams-doc attribute');
  t.equal(dl.querySelectorAll('dt')[9].innerHTML, 'Article References', 'dt with "Article References""');
  t.equal(dl.querySelectorAll('dt')[9].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dl.querySelectorAll('dt')[9].nextElementSibling.firstElementChild.tagName, 'UL', 'dt followed by dd with ul (reference list)');
  t.equal(dl.querySelectorAll('dt')[9].nextElementSibling.firstElementChild.childElementCount, 2, 'dt followed by dd with ul has at least two children');
});

