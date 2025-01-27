/*!
 *  Copyright (c) 2023 American Mathematical Society
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { article, articleAlttitle, articleNometa, book } from './helper.js';
import tape from 'tape';


tape('sec, app, front-matter-part, dedication, title, label', async function (t) {
  t.plan(45);
  const document = article;

  t.ok(document.querySelector('#ack1[role="doc-acknowledgments"][data-ams-doc-level="1"]'), 'ack to role doc-acknowledgments with data-ams-doc-level');
  t.ok(document.querySelector('#ack2[role="doc-acknowledgments"]'), 'front-matter-part with matching title text to role doc-acknowledgments');
  t.ok(document.querySelector('#ack3[role="doc-acknowledgments"]'), 'sec with matching title text to role doc-acknowledgments');
  t.ok(document.querySelector('#intro1[role="doc-introduction"]'), 'front-matter-part with matching title text to role doc-introduction');
  t.ok(document.querySelector('#intro2[role="doc-introduction"]'), 'sec with matching title text to role doc-introduction');
  t.ok(document.querySelector('#ded[role="doc-dedication"]'), 'dedication to role doc-dedication');

  t.equal(document.querySelector('#subsec h3').innerHTML, '<span data-ams-doc="label">Subsection</span>', 'subsection without wrapping section gets correct level');

  t.equal(document.querySelector('#seclabeltitle h2').innerHTML, '<span data-ams-doc="label">Label</span> <span data-ams-doc="title">Title</span>', 'sec with label+title: heading level and content');
  t.equal(document.querySelector('#sectitle h2').innerHTML, '<span data-ams-doc="title">Title</span>', 'sec with title: heading level and content');
  t.equal(document.querySelector('#seclabel h2').innerHTML, '<span data-ams-doc="label">Label</span>', 'sec with label: heading level and content');
  t.equal(document.querySelector('#applabeltitle h2').innerHTML, '<span data-ams-doc="label">Label</span> <span data-ams-doc="title">Title</span>', 'app with label+title: heading level and content');
  t.equal(document.querySelector('#apptitle h2').innerHTML, '<span data-ams-doc="title">Title</span>', 'app with title: heading level and content');
  t.equal(document.querySelector('#applabel h2').innerHTML, '<span data-ams-doc="label">Label</span>', 'app with label: heading level and content');

  t.ok(document.querySelector('#sectitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#seclabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#apptitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document.querySelector('#applabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');

  t.notOk(document.querySelector('#alttitle h2').hasAttribute('data-ams-doc-alttitle'), 'sec with title: subtitle to p with data-ams-doc');

  t.equal(document.querySelector('#appack').getAttribute('role'), 'doc-acknowledgments', 'appendix with title "Acknowledg": role');

  t.ok(document.querySelector('#refhead h2'), 'refhead heading level');

  const document2 = book;
  t.ok(document2.querySelector('#chapter[role="doc-chapter"]'), 'sec with specific-use chapter to role doc-chapter'); // NOTE so far, chapters only occur in books but the xslt doesn't check for it

  t.equal(document2.querySelector('#seclabeltitle h2').innerHTML, '<span data-ams-doc="label">Label</span> <span data-ams-doc="title">Title</span>', 'sec with label+title: heading level and content');
  t.equal(document2.querySelector('#sectitle h2').innerHTML, '<span data-ams-doc="title">Title</span>', 'sec with title: heading level and content');
  t.equal(document2.querySelector('#seclabel h2').innerHTML, '<span data-ams-doc="label">Label</span>', 'sec with label: heading level and content');
  t.equal(document2.querySelector('#fmlabeltitle h1').innerHTML, '<span data-ams-doc="label">Label</span> <span data-ams-doc="title">Title</span>', 'front-matter-part with label+title: heading level and content');
  t.equal(document2.querySelector('#fmtitle h1').innerHTML, '<span data-ams-doc="title">Title</span>', 'front-matter-part with title: heading level and content');
  t.equal(document2.querySelector('#fmlabel h1').innerHTML, '<span data-ams-doc="label">Label</span>', 'front-matter-part with label: heading level and content');
  t.equal(document2.querySelector('#applabeltitle h1').innerHTML, '<span data-ams-doc="label">Label<ams-x>.</ams-x></span> <span data-ams-doc="title">Title</span>', 'app with label+title: heading level and content');
  t.equal(document2.querySelector('#apptitle h1').innerHTML, '<span data-ams-doc="title">Title</span>', 'app with title: heading level and content');
  t.equal(document2.querySelector('#applabel h1').innerHTML, '<span data-ams-doc="label">Label</span>', 'app with label: heading level and content');

  t.equal(document2.querySelector('#part').getAttribute('role'), 'doc-part', 'part role');
  t.ok(document2.querySelector('#inparttitle h2'), 'sec with title in chapter in part: heading level reduced');
  t.ok(document2.querySelector('#inpartlabel h2'), 'sec with label in chapter in part: heading level reduced');
  t.equal(document2.querySelector('#xcb').getAttribute('data-ams-style'), 'xcb', 'sec with style, mapped to data-ams-style');

  t.ok(document2.querySelector('#fmtitle header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document2.querySelector('#fmlabel header p[data-ams-doc="subtitle"]'), 'sec with title: subtitle to p with data-ams-doc');
  t.ok(document2.querySelector('#ack1[role="doc-acknowledgments"] h1'), 'ack to role doc-acknowledgments with data-ams-doc-level'); // NOTE should be testing doc-level but they differ in XSL vs JS

  t.equal(document2.querySelector('#alttitle h1').getAttribute('data-ams-doc-alttitle'), 'Label. Alt title', 'sec with title: subtitle to p with data-ams-doc');

  const bookAppGroup = document2.querySelector('#book-app-group');
  t.equal(bookAppGroup.getAttribute('data-ams-doc'), 'app-group', 'book-app-group data-ams-doc');
  t.equal(bookAppGroup.getAttribute('data-ams-doc-level'), '0', 'book-app-group data-ams-level');
  t.equal(document2.querySelector('#applabeltitle').getAttribute('role'), 'doc-appendix', 'book-app role');
  t.notEqual(document2.querySelector('#appSection').getAttribute('role'), 'doc-appendix', 'nested book-app does not get role=doc-appendix');

  const document3 = articleAlttitle;
  t.ok(document3.querySelector('section[data-ams-doc-level="1"]'), 'Article with part gets increased doc-levels');
  t.ok(document3.querySelector('section[data-ams-doc-level="2"]'), 'Article with part gets increased doc-levels');

  const document4 = articleNometa;
  t.equal(document4.querySelector('#sec').getAttribute('role'), 'doc-part', 'part in article: role');
});
