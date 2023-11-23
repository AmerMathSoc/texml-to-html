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


import { book } from './helper.js';
import tape from 'tape';

tape('Template: book-back/ref-list ', async function(t) {
  t.plan(4);

  const document = book;
  const bibl = document.querySelector('section#reflist[role="doc-bibliography"]');
  t.ok(bibl, 'ref-list becomes section with id, role, doc-level');
  const title = bibl.querySelector('h1');
  t.equal(title.outerHTML, '<h1><span data-ams-doc="title">title</span></h1>', 'ref-list title as heading');
  const list = bibl.querySelector('dl');
  t.ok(list, 'dl created for ref items');
  t.ok(document.querySelector('section#reflistchapter [role="doc-bibliography"] h2'), 'Chapter-level ref-list title gets h2')
});
