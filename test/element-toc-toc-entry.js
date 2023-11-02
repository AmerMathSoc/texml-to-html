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

tape('Template: (book) toc, toc-entry', async function(t) {
  t.plan(14);
  const document = book;

  const toc = document.querySelector('nav[role="doc-toc"]#toc');
  t.ok(toc, 'toc: wrapping nav element with role=doc-toc and id');
  const title = document.querySelector('nav[role="doc-toc"] h1'); // NOTE xslt will have nav>h1, JS will have nav>header>h1
  t.ok(title, 'toc: title-group passthrough, title becomes heading');
  const list = toc.querySelector('ol');
  t.ok(list, 'toc: ordered list');
  t.equal(list.children.length, 6, 'Nested toc-entries remain nested')
  t.equal(
    list.querySelector('li a[href="#tocid1"]').innerHTML,
    'Chunk',
    'toc-entry and nav-pointer'
  );
  t.equal(
    list.querySelector('li a[href="#tocid2"]').innerHTML,
    '2. Chunk',
    'toc-entry, label, nav-pointer'
  );
  t.equal(list.querySelector('ol').children.length, 1, 'Doubly nested toc-entries remain nested');
  t.equal(
    list.querySelector('li a[href="#tocid2"]+ol li a[href="#tocid3"]').innerHTML,
    '1. SubChunk',
    'Nested toc-entry, label, nav-pointer'
  );
  t.equal(
    list.querySelector('li a[href="#tocid4"]').innerHTML,
    '1. SubSubChunk with Link',
    'toc-entry with xref in title'
  );
  t.equal(
    list.querySelector('li a[href="#tocid5"]').innerHTML,
    'Chunk with alt title',
    'toc-entry with alt-title: content'
  );
  t.equal(
    list.querySelector('li a[href="#tocid5"]').getAttribute('data-ams-doc-alttitle'),
    'Alt title',
    'toc-entry with alt-title: data-ams-doc-alttitle'
  );
  t.equal(
    list.querySelector('li a[href="#tocid6"]').innerHTML,
    'Chunk without label but subchunk with label',
    'toc-entry without label but sub-entry with label'
  );
  t.equal(
    list.querySelector('li a[href="#tocid8"]+br+em').innerHTML,
    'Chapter Author',
    'toc-entry with contributor'
  );
  t.equal(
    list.querySelector('li a[href="#tocid9"]+br+em+em').innerHTML,
    'A Nother Author',
    'toc-entry with contributors'
  );
});
