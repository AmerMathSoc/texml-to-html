const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: contrib-group', async function(t) {
  t.plan(4);
  const input = path.resolve(
    __dirname,
    'element-contrib-group-contrib.xml'
  );
  const document = await xsltproc(input);
  const contribgroup = document.querySelector('section[data-ams-doc="copyright-page"] dl dt');
  t.equal(contribgroup.innerHTML, 'Contrib-group-typ Information', 'contrib-group creates dt with content derived from @content-type'); // NOTE last char stripped | TODO should we check for actually expected values?
  t.equal(contribgroup.nextElementSibling.tagName, 'DD', 'nextSibling is DD')
  t.equal(contribgroup.nextElementSibling.getAttribute('data-ams-doc-contrib'), 'contrib-group-type', 'nextSibling has data-ams-doc-contrib with contrib-group@content-type');
  t.equal(contribgroup.nextElementSibling.getAttribute('data-ams-doc-contrib-comment'), 'comment', 'nextSibling has data-ams-doc-contrib-comment with author-comment text content');
});
