
import { article } from './helper.js';
import tape from 'tape';


tape('Template: kwd-group', async function(t) {
  t.plan(2);
  const document = article;
  t.ok(document.querySelector('section[data-ams-doc="frontmatter"] ul[data-ams-doc="keywords"]'), 'keywords kwd-group to ul');
  t.ok(document.querySelector('section[data-ams-doc="frontmatter"] ul[data-ams-doc="MSC scheme"]'), 'MSC kwd-group to ul');
});

