const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('sec, app, front-matter-part, dedication, title, label', async function(t) {
  t.plan(37);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);

  // NOTE these are brittle and somewhat stupid test. We'll indirectly test this via headings later.
  // t.equal(document.querySelectorAll('[data-ams-doc-level="1"]').length, 11, 'disp-level attribute to data-ams-doc-level'); //app, dedication don't preserve these (yet) but need it for heading computation
  // t.equal(document.querySelectorAll('[data-ams-doc="use"]').length, 11, 'specific-use attribute to data-ams-doc'); //app, dedication don't preserve these (yet)

  t.ok(document.querySelector('#ack1[role="doc-acknowledgments"]'), 'ack to role doc-acknowledgments');
  t.ok(document.querySelector('#ack2[role="doc-acknowledgments"]'), 'front-matter-part with matching title text to role doc-acknowledgments');
  t.ok(document.querySelector('#ack3[role="doc-acknowledgments"]'), 'sec with matching title text to role doc-acknowledgments');
  t.ok(document.querySelector('#intro1[role="doc-introduction"]'), 'front-matter-part with matching title text to role doc-introduction');
  t.ok(document.querySelector('#intro2[role="doc-introduction"]'), 'sec with matching title text to role doc-introduction');
  t.ok(document.querySelector('#ded[role="doc-dedication"]'), 'dedication to role doc-dedication');

  // NOTE only books have apps without app-group.
  // t.ok(document.querySelector('#applabeltitle[role="doc-appendix"]'), 'standalone app to role doc-appendix');

  t.equal(document.querySelector('#subsec header h3').innerHTML, 'Subsection', 'subsection without wrapping section gets correct level');

  t.equal(document.querySelector('#seclabeltitle header h2').innerHTML, 'Label. Title', 'sec with label+title: heading level and content');
  t.equal(document.querySelector('#sectitle header h2').innerHTML, 'Title', 'sec with title: heading level and content');
  t.equal(document.querySelector('#seclabel header h2').innerHTML, 'Label', 'sec with label: heading level and content');
  t.equal(document.querySelector('#fmlabeltitle header h2').innerHTML, 'Label. Title', 'front-matter-part with label+title: heading level and content');
  t.equal(document.querySelector('#fmtitle header h2').innerHTML, 'Title', 'front-matter-part with title: heading level and content');
  t.equal(document.querySelector('#fmlabel header h2').innerHTML, 'Label', 'front-matter-part with label: heading level and content');
  t.equal(document.querySelector('#applabeltitle header h2').innerHTML, 'Label. Title', 'app with label+title: heading level and content');
  t.equal(document.querySelector('#apptitle header h2').innerHTML, 'Title', 'app with title: heading level and content');
  t.equal(document.querySelector('#applabel header h2').innerHTML, 'Label', 'app with label: heading level and content');

  t.ok(document.querySelector('#sectitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#seclabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#fmtitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#fmlabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#apptitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#applabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');


  const input2 = path.resolve(__dirname, 'book.xml');
  const document2 = await xsltproc(input2);
  t.ok(document2.querySelector('#chapter[role="doc-chapter"]'), 'sec with specific-use chapter to role doc-chapter'); // NOTE so far, chapters only occur in books but the xslt doesn't check for it

  t.equal(document2.querySelector('#seclabeltitle header h2').innerHTML, 'Label. Title', 'sec with label+title: heading level and content');
  t.equal(document2.querySelector('#sectitle header h2').innerHTML, 'Title', 'sec with title: heading level and content');
  t.equal(document2.querySelector('#seclabel header h2').innerHTML, 'Label', 'sec with label: heading level and content');
  t.equal(document2.querySelector('#fmlabeltitle header h1').innerHTML, 'Label. Title', 'front-matter-part with label+title: heading level and content');
  t.equal(document2.querySelector('#fmtitle header h1').innerHTML, 'Title', 'front-matter-part with title: heading level and content');
  t.equal(document2.querySelector('#fmlabel header h1').innerHTML, 'Label', 'front-matter-part with label: heading level and content');
  t.equal(document2.querySelector('#applabeltitle header h1').innerHTML, 'Label. Title', 'app with label+title: heading level and content');
  t.equal(document2.querySelector('#apptitle header h1').innerHTML, 'Title', 'app with title: heading level and content');
  t.equal(document2.querySelector('#applabel header h1').innerHTML, 'Label', 'app with label: heading level and content');

  t.ok(document2.querySelector('#inparttitle header h2'), 'sec with title in chapter in part: heading level reduced');
  t.ok(document2.querySelector('#inpartlabel header h2'), 'sec with label in chapter in part: heading level reduced');

  // NOTE sec-meta only occurs in 3 publications: MCL01, MCL14 and JAMS410; the tests only test for those specific situations
  // TODO find a cleaner solution, e.g., general purpose markup + publication specific customization
  t.ok(document.querySelector('#secmeta section[data-ams-doc="sec-meta"] dl'), 'article sec-meta');
  t.ok(document2.querySelector('#secmeta section[data-ams-doc="sec-meta"] p span'), 'book sec-meta');
  t.ok(document2.querySelector('#secmeta section[data-ams-doc="sec-meta"] section[role="doc-abstract"]'), 'book sec-meta');
});
