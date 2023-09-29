import { article } from './helper.js';
import tape from 'tape';

tape('compound-kwd.js', async function(t) {
  t.plan(1);
  const document = article;
  t.equal(document.querySelector('section[data-ams-doc="frontmatter"] ul[data-ams-doc="MSC scheme"] li').outerHTML, '<li data-msc-key="key1" data-msc-role="primary">Formal groups, <span data-ams-doc="math inline"><tex-math>p</tex-math></span>-divisible groups</li>', 'compound-kwd to li with data attributes and content');
});
