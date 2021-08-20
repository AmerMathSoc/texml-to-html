const { article } = require('./helper.js');
const tape = require('tape');

tape('disp-formula-group', async function(t) {
  t.plan(3);
  const document = article;
  const groupChild = document.querySelector('#equations figure[data-ams-doc="statement"]#disp-formula-group');
  t.ok(groupChild, 'disp-formula-group as figure with data-ams-doc="statement" with id')
  t.equal(groupChild.firstElementChild.tagName, 'FIGCAPTION', 'disp-formula-group label');
  t.equal(groupChild.firstElementChild.innerHTML, 'Formula Group', 'disp-formula-group passes label along');
});
