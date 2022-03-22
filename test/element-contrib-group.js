import { article } from './helper.js';
import tape from 'tape';

tape('Template: contrib-group', async function(t) {
  t.plan(5);
  const document = article;
  const contribgroups = document.querySelectorAll('section[data-ams-doc="copyright-page"] dl dd[data-ams-doc-contrib="contribAs"]');
  t.equal(contribgroups.length, 1, 'Only one contribute group of type "ContribAs"');
  const contribgroup = contribgroups[0];
  t.equal(contribgroup.previousElementSibling.innerHTML, 'ContribA Information', 'contrib-group creates dt with content derived from @content-type'); // NOTE last char stripped | TODO should we check for actually expected values?
  t.equal(contribgroup.tagName, 'DD', 'nextSibling is DD')
  t.equal(contribgroup.getAttribute('data-ams-doc-contrib'), 'contribAs', 'nextSibling has data-ams-doc-contrib with contrib-group@content-type');
  t.equal(contribgroup.getAttribute('data-ams-doc-contrib-comment'), 'comment', 'nextSibling has data-ams-doc-contrib-comment with author-comment text content');
});
