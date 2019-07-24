const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Empty Labels should be stripped', async function(t) {
  t.plan(5);
  const input = path.resolve(__dirname, 'stripEmptyLabel.xml');
  const output = await xsltproc(input);
  t.ok(output.stdout.search('<h2></h2>') > -1);
  t.ok(output.stdout.search('<h3>. </h3>') > -1);
  t.ok(output.stdout.search('<span data-ams-doc="secheading"></span>') > -1);
  t.ok(output.stdout.search('<figcaption></figcaption>') > -1);
  t.ok(
    output.stdout.search(
      '<nav role="doc-toc"><ol><li><a href="#"></a></li></ol></nav>'
    ) > -1
  );
});
