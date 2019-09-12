const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: img', async function(t) {
  t.plan(3);
  const input = path.resolve(__dirname, 'element-img.xml');
  const document = await xsltproc(input);
  const img =  document.querySelector('section[data-ams-doc="article"] img');
  t.ok(img, 'img element in article');
  t.equal(img.getAttribute('src'), 'file', 'img source');
  t.equal(img.getAttribute('alt'), 'text', 'img alt-text');
});

