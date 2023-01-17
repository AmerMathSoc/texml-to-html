import { article, articleAlttitle, articleNometa, book } from './helper.js';
import tape from 'tape';


tape('sec, app, front-matter-part, dedication, title, label', async function(t) {
  t.plan(44);
  const document = article;

  t.ok(document.querySelector('#ack1[role="doc-acknowledgments"][data-ams-doc-level="1"]'), 'ack to role doc-acknowledgments with data-ams-doc-level');
  t.ok(document.querySelector('#ack2[role="doc-acknowledgments"]'), 'front-matter-part with matching title text to role doc-acknowledgments');
  t.ok(document.querySelector('#ack3[role="doc-acknowledgments"]'), 'sec with matching title text to role doc-acknowledgments');
  t.ok(document.querySelector('#intro1[role="doc-introduction"]'), 'front-matter-part with matching title text to role doc-introduction');
  t.ok(document.querySelector('#intro2[role="doc-introduction"]'), 'sec with matching title text to role doc-introduction');
  t.ok(document.querySelector('#ded[role="doc-dedication"]'), 'dedication to role doc-dedication');

  t.equal(document.querySelector('#subsec h3').innerHTML, 'Subsection', 'subsection without wrapping section gets correct level');

  t.equal(document.querySelector('#seclabeltitle h2').innerHTML, '<span data-ams-doc="label">Label. </span>Title', 'sec with label+title: heading level and content');
  t.equal(document.querySelector('#sectitle h2').innerHTML, 'Title', 'sec with title: heading level and content');
  t.equal(document.querySelector('#seclabel h2').innerHTML, 'Label', 'sec with label: heading level and content');
  t.equal(document.querySelector('#applabeltitle h2').innerHTML, '<span data-ams-doc="label">Label. </span>Title', 'app with label+title: heading level and content');
  t.equal(document.querySelector('#apptitle h2').innerHTML, 'Title', 'app with title: heading level and content');
  t.equal(document.querySelector('#applabel h2').innerHTML, 'Label', 'app with label: heading level and content');

  t.ok(document.querySelector('#sectitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#seclabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#apptitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#applabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');

  t.notOk(document.querySelector('#alttitle h2').hasAttribute('data-ams-doc-alttitle'), 'sec with title: subtitle to p with data-ams-doc');

  t.equal(document.querySelector('#appack').getAttribute('role'), 'doc-acknowledgments', 'appendix with title "Acknowledg": role');

  t.ok(document.querySelector('#refhead h2'), 'refhead heading level');

  const document2 = book;
  t.ok(document2.querySelector('#chapter[role="doc-chapter"]'), 'sec with specific-use chapter to role doc-chapter'); // NOTE so far, chapters only occur in books but the xslt doesn't check for it

  t.equal(document2.querySelector('#seclabeltitle h2').innerHTML, '<span data-ams-doc="label">Label. </span>Title', 'sec with label+title: heading level and content');
  t.equal(document2.querySelector('#sectitle h2').innerHTML, 'Title', 'sec with title: heading level and content');
  t.equal(document2.querySelector('#seclabel h2').innerHTML, 'Label', 'sec with label: heading level and content');
  t.equal(document2.querySelector('#fmlabeltitle h1').innerHTML, '<span data-ams-doc="label">Label. </span>Title', 'front-matter-part with label+title: heading level and content');
  t.equal(document2.querySelector('#fmtitle h1').innerHTML, 'Title', 'front-matter-part with title: heading level and content');
  t.equal(document2.querySelector('#fmlabel h1').innerHTML, 'Label', 'front-matter-part with label: heading level and content');
  t.equal(document2.querySelector('#applabeltitle h1').innerHTML, '<span data-ams-doc="label">Label. </span>Title', 'app with label+title: heading level and content');
  t.equal(document2.querySelector('#apptitle h1').innerHTML, 'Title', 'app with title: heading level and content');
  t.equal(document2.querySelector('#applabel h1').innerHTML, 'Label', 'app with label: heading level and content');

  t.equal(document2.querySelector('#part').getAttribute('role'), 'doc-part', 'part role');
  t.ok(document2.querySelector('#inparttitle h2'), 'sec with title in chapter in part: heading level reduced');
  t.ok(document2.querySelector('#inpartlabel h2'), 'sec with label in chapter in part: heading level reduced');

  t.ok(document2.querySelector('#fmtitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document2.querySelector('#fmlabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document2.querySelector('#ack1[role="doc-acknowledgments"] h1'), 'ack to role doc-acknowledgments with data-ams-doc-level'); // NOTE should be testing doc-level but they differ in XSL vs JS

  t.equal(document2.querySelector('#alttitle h1').getAttribute('data-ams-doc-alttitle'), 'Label. Alt title', 'sec with title: subtitle to p with data-ams-doc');

  const bookAppGroup = document2.querySelector('#book-app-group');
  t.equal(bookAppGroup.getAttribute('role'), 'doc-part', 'book-app-group role');
  t.equal(bookAppGroup.getAttribute('data-ams-doc'), 'part', 'book-app-group data-ams-doc');
  t.equal(bookAppGroup.getAttribute('data-ams-doc-level'), '0', 'book-app-group data-ams-level');
  t.equal(document2.querySelector('#applabeltitle').getAttribute('role'), 'doc-appendix', 'book-app role');

  const document3 = articleAlttitle;
  t.ok(document3.querySelector('section[data-ams-doc-level="1"]'), 'Article with part gets increased doc-levels');
  t.ok(document3.querySelector('section[data-ams-doc-level="2"]'), 'Article with part gets increased doc-levels');

  const document4 = articleNometa;
  t.equal(document4.querySelector('#sec').getAttribute('role'), 'doc-part', 'part in article: role');
});
