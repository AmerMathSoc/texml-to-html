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

import { article, articleAlttitle } from './helper.js';
import tape from 'tape';


tape('ref-list, ref-list/title, ref, ref/label', async function (t) {
  t.plan(10);
  const document = article;
  const bibliography = document.querySelector('section[role="doc-bibliography"]');
  t.ok(bibliography, 'Section with role doc-bibliography');
  t.ok(bibliography.querySelector('h2'), 'Bibliography heading in article');
  t.ok(bibliography.querySelector('dl dt#ref'), 'Reference as DT with ID');
  t.equal(bibliography.querySelector('dl dt#ref').innerHTML, 'Label', 'Reference label in DT');

  t.ok(bibliography.querySelector('dl dt#refnolabel+dd'), 'Reference without label');

  const document2 = articleAlttitle;
  const bib = document2.querySelector('section[role="doc-bibliography"]');
  t.ok(bib, 'Outer ref-list Section with role doc-bibliography');
  t.ok(bib.querySelector('h2'), 'Outer ref-list heading');
  t.notOk(bib.querySelector(':scope>DL'), 'Outer ref-list does not have a DL child');
  const nestedBib = bib.querySelector('section');
  t.ok(nestedBib.querySelector('h3'), 'Inner ref-list heading');
  t.ok(nestedBib.querySelector('dl'), 'Inner ref-list has DL');
});
