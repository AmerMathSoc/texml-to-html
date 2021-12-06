
const { article } = require('./helper.js');
const tape = require('tape');


tape('Helper: mapColorAttributes', async function(t) {
  t.plan(1);
  const document = article;
  t.equal(document.querySelector('span[data-ams-style-color]').getAttribute('data-ams-style-color'), 'color:Teal;background-color:rgb(0.000%, 0.000%, 1.000%);border-color:rgb(0, 140, 10);', 'color attributes combined as single data-ams-style-color attribute');
});

