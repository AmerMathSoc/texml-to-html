
import { article } from './helper.js';
import tape from 'tape';


tape('Template: kwd', async function(t) {
  t.plan(1);
  const document = article;
  t.equal(document.querySelector('section[data-ams-doc="frontmatter"] ul[data-ams-doc="keywords"] li').innerHTML, 'keyword', 'kwd to li with content');
});

