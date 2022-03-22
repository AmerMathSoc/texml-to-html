
import { article } from './helper.js';
import tape from 'tape';


tape('Template: verse-group', async function(t) {
  t.plan(1);
  const document = article;
  const figure = document.querySelector('figure[data-ams-doc="verse-group"]');
  t.ok(figure, 'Figure data-ams-doc=verse-group attribute');
});

