
const { book } = require('./helper.js');
const tape = require('tape');


tape('Template: simpletabbing, line', async function(t) {
  t.plan(4);
  const document = book;
  const tabbing = document.querySelector('section#simpletabbing');
  t.equal(tabbing.getAttribute('data-ams-doc'), 'simpletabbing', 'Tabbing as section with data-ams-doc attribute');
  const lines = document.querySelectorAll('section#simpletabbing > p');
  t.equal(lines[0].getAttribute('data-ams-doc'), 'line', 'Line as p with data-ams-doc');
  t.equal(lines[0].id, 'simpletabbing-line', 'Line id preserved');
  t.equal(lines[1].getAttribute('data-ams-indent'), '1', 'Line with indent s data-ams-indent');
});
