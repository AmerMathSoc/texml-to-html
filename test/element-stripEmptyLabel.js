const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Empty Labels should be stripped', async function(t) {
  t.plan(6);
  const input = path.resolve(__dirname, 'element-stripEmptyLabel.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelector('nav[role="doc-toc"] ol li a').innerHTML, '', 'Toc-entry with (empty) title and empty label');
  t.equal(document.querySelector('section[data-ams-doc-level="1"] h2').innerHTML, '', 'Sec with (empty) title and empty label');
  t.equal(document.querySelector('section[data-ams-doc="statement"]').innerHTML.trim(), '<span data-ams-doc="secheading"></span>', 'Statement with (empty) title and empty label');
  t.equal(document.querySelector('span[data-ams-doc="secheading"]').innerHTML, '', 'Secheading in statement with empty label');
  t.equal(document.querySelectorAll('section[data-ams-doc="statement"]')[1].innerHTML.trim(), '', 'Statement with no title and empty label');
  t.equal(document.querySelector('figcaption').innerHTML, '', 'Fig with empty label');
});
