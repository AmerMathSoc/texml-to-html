
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: styled-content', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('span[data-ams-style="type"]'), 'Styled-content as span with data-ams-style');
});

