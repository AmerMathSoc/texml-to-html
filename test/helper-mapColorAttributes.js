
import { article } from './helper.js';
import tape from 'tape';


tape('Helper: mapColorAttributes', async function(t) {
  t.plan(1);
  const document = article;
  t.equal(document.querySelector('span[data-ams-style-color]').getAttribute('data-ams-style-color'), 'color:Teal;background-color:rgb(0.000%, 0.000%, 1.000%);border-color:rgb(0, 140, 10);border-width:thin;border-style:solid;', 'color attributes combined as single data-ams-style-color attribute');
});

