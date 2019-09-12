const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: journal-meta, ...', async function(t) {
  t.plan(1);
  const input = path.resolve(
    __dirname,
    'element-journal-meta.xml'
  );
  const document = await xsltproc(input);
  const jmeta = document.querySelector('section[data-ams-doc="copyright-page"] dd'); // NOTE brittle
  t.equal(jmeta.innerHTML.trim(), '<a href="href">journal-title</a>, <span>Volume volume</span>, <span>Issue issue</span>, ISSN <span>print</span>, published by the <span>publisher-name</span>, <span>publisher-loc</span>.', 'journal-meta content derived from self-uri, journal-title, volume, issue, issn, publisher-name, publisher-loc');  // NOTE We need to check this and checking each derived piece would not add more value
});
