
import { article } from './helper.js';
import tape from 'tape';


tape('Template: styled-content', async function(t) {
  t.plan(2);
  const document = article;
  t.ok(document.querySelector('span[data-ams-style="type"]'), 'Styled-content as span with data-ams-style');
  t.ok(document.querySelector('span[data-ams-style-color]').getAttribute('data-ams-style-color'), 'Styled-content as span with data-ams-style'); // NOTE just check existence; correctness tested in helper-mapsColorAttributes
});

