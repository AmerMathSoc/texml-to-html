
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: styled-content', async function(t) {
  t.plan(2);
  const document = article;
  t.ok(document.querySelector('span[data-ams-style="type"]'), 'Styled-content as span with data-ams-style');
  t.equal(document.querySelector('span[data-ams-style-color]').getAttribute('data-ams-style-color'), 'color:Teal;background-color:rgb(0.000%, 0.000%, 1.000%);border-color:rgb(0, 140, 10);', 'Styled-content as span with data-ams-style');
});

