const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: img', async function(t) {
  t.plan(9);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const graphic =  document.querySelector('img[data-ams-doc="graphic"]');
  t.ok(graphic, 'img with data-ams-doc=graphic');
  t.equal(graphic.getAttribute('src'), 'file', 'graphic href as source');
  t.equal(graphic.getAttribute('alt'), 'text', 'graphic alt-text');
  t.equal(graphic.getAttribute('data-ams-style'), 'use', 'graphic specific-use');
  t.equal(graphic.getAttribute('data-ams-height'), 'height', 'graphic height');
  t.equal(graphic.getAttribute('data-ams-width'), 'width', 'graphic width');
  t.equal(graphic.getAttribute('alt'), 'text', 'alt attribute');

  const inlinegraphic =  document.querySelector('img[data-ams-doc="inline-graphic"]');
  t.ok(inlinegraphic, 'img with data-ams-doc=inline-graphic');
  t.equal(inlinegraphic.getAttribute('alt'), '', 'alt attribute fallback');
});

