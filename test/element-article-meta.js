const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: article-meta', async function(t) {
  t.plan(25);
  const input = path.resolve(__dirname, 'element-article-meta.xml');
  const document = await xsltproc(input);
  const copyrightpage = document.querySelector('section[data-ams-doc="copyright-page"]');
  t.ok (copyrightpage, 'article-meta creates wrapping section with data-ams-doc=copyright-page');
  t.equal(copyrightpage.firstElementChild.outerHTML, '<h2>Article Information</h2>', 'copyright page heading');
  const dl = copyrightpage.querySelector('dl');
  t.ok(dl, 'Wrapping dl for metadata');
  const dts = document.querySelectorAll('section[data-ams-doc="copyright-page"]>dl>dt');
  t.equal(dts[0].innerHTML, 'MSC ', 'dt with "MSC "');
  t.equal(dts[1].innerHTML, 'Keywords', 'dt with "Keywords"');
  t.equal(dts[2].innerHTML, 'ContribA Information', 'contrib group A to dt with generated content');
  t.equal(dts[2].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dts[3].innerHTML, 'ContribB Information', 'contrib group B dt from contrib-group');
  t.equal(dts[3].nextElementSibling.tagName, 'DD', 'dd from contrib-group');
  t.ok(dts[3].nextElementSibling.hasAttribute('data-ams-doc-contrib'), 'dd from contrib-group has data-ams-doc-contrib');
  t.equal(dts[4].innerHTML, 'Additional Notes', 'dt from funding-group');
  t.equal(dts[4].nextElementSibling.tagName, 'DD', 'dd from funding-group');
  t.equal(dts[5].innerHTML, 'meta-name', 'dt from custom-meta-group');
  t.equal(dts[5].nextElementSibling.outerHTML, '<dd>meta-value</dd>', 'dd followed by dt from custom-meta-group');
  t.equal(dts[6].innerHTML, 'Journal Information', 'dt with "Journal Information"');
  t.equal(dts[6].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dts[7].innerHTML, 'Publication History', 'dt with "Publication History""');
  t.equal(dts[7].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dts[8].innerHTML, 'Copyright Information', 'dt with "Copyright Information""');
  t.equal(dts[8].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dts[8].nextElementSibling.getAttribute('data-ams-doc'), 'copyright', 'dt followed by dd with data-ams-doc attribute');
  t.equal(dts[9].innerHTML, 'Article References', 'dt with "Article References""');
  t.equal(dts[9].nextElementSibling.tagName, 'DD', 'dt followed by dd');
  t.equal(dts[9].nextElementSibling.firstElementChild.tagName, 'UL', 'dt followed by dd with ul (reference list)');
  t.ok(dts[9].nextElementSibling.firstElementChild.childElementCount > 2, 'dt followed by dd with ul has at least two children');
});

