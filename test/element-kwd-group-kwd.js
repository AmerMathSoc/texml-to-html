
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: kwd-group, kwd', async function(t) {
  t.plan(2);
  const document = article;
  t.ok(document.querySelector('section[data-ams-doc="copyright-page"] ul'), 'kwd-group to ul');
  t.equal(document.querySelector('section[data-ams-doc="copyright-page"] ul li').innerHTML, 'keyword', 'kwd to li with content');
});

