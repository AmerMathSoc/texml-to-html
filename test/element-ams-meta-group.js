const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: ams-meta-group', async function(t) {
  t.plan(3);
  const input = path.resolve(
    __dirname,
    'element-ams-meta-group.xml'
  );
  const document = await xsltproc(input);
  const mscgroup = document.querySelector('section[data-ams-doc="article"] dt'); // NOTE brittle selector
  t.equal(mscgroup.innerHTML, 'MSC scheme', 'ams-meta-group with scheme to DT with content');
  const mscPrimary = mscgroup.nextElementSibling;
  t.equal(mscPrimary.outerHTML.trim(), '<dd>Primary: <a href="http://www.ams.org/msc/msc2010.html?t=key1">key1 (desc1)</a>, <a href="http://www.ams.org/msc/msc2010.html?t=key2">key2 (desc2)</a>\n</dd>', 'msc with primary elements to dd with content'); // NOTE I don't understand where \n comes from
  const mscSecondary = mscPrimary.nextElementSibling;
  t.equal(mscSecondary.outerHTML.trim(), '<dd>Secondary: <a href="http://www.ams.org/msc/msc2010.html?t=key3">key3 (desc3)</a>, <a href="http://www.ams.org/msc/msc2010.html?t=key4">key4 (desc4)</a>\n</dd>', 'msc with primary elements to dd with content'); // NOTE I don't understand where \n comes from

});