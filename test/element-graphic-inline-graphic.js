import { article } from './helper.js';
import tape from 'tape';


tape('Template: img', async function(t) {
  t.plan(9);
  const document = article;
  const graphic =  document.querySelector('img[data-ams-doc="graphic"]');
  t.ok(graphic, 'img with data-ams-doc=graphic');
  t.equal(graphic.getAttribute('src'), 'file', 'graphic href as source');
  t.equal(graphic.getAttribute('alt'), 'text', 'graphic alt-text');
  t.equal(graphic.getAttribute('data-ams-style'), 'use', 'graphic specific-use');
  t.equal(graphic.getAttribute('data-ams-height'), '100pt', 'graphic height');
  t.equal(graphic.getAttribute('data-ams-width'), '100px', 'graphic width (with added unit)');
  t.equal(graphic.getAttribute('alt'), 'text', 'alt attribute');

  const inlinegraphic =  document.querySelector('img[data-ams-doc="inline-graphic"]');
  t.ok(inlinegraphic, 'img with data-ams-doc=inline-graphic');
  t.equal(inlinegraphic.getAttribute('alt'), '', 'alt attribute fallback');
});

