
import { article } from './helper.js';
import tape from 'tape';

tape('Template: boxed-text', async function(t) {
  t.plan(2);
  const document = article;
  const framedBoxedText = document.querySelector('div[data-ams-style="boxed"][data-ams-content-type="framed"]');
  t.ok(framedBoxedText, 'boxed-text as div with data-ams-content-type="framed"');
  const tcolorbox = document.querySelector('div[data-ams-style="boxed"][data-ams-content-type="tcolorbox"]');
  t.ok(tcolorbox.getAttribute('data-ams-style-color'), 'boxed-text as div with data-ams-style="boxed"'); // NOTE just check existence; correctness tested in helper-mapsColorAttributes
});
