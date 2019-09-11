const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: front/notes@notes-type=dedication', async function(t) {
  t.plan(1);
  const input = path.resolve(
    __dirname,
    'element-note-dedication.xml'
  );
  const document = await xsltproc(input);
  t.ok(document.querySelector('div[role="doc-dedication"]'), 'notes with notes-type dedication creates div with role doc-dedication');
});
