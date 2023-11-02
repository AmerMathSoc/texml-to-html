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

tape('Template: book', async function(t) {
  t.plan(5);

  const document = book;

  const head = document.head;
  t.ok(head, 'document head created');
  t.ok(document.querySelector('head meta[name="viewport"][content="width=device-width, initial-scale=1"]'), 'meta tag viewport');
  t.equal(document.title, 'title', 'document title from book-title');
  t.ok(document.body.querySelector('section[data-ams-doc="titlepage"]'), 'document body has titlepage');
  t.ok(document.body.querySelector('section[role="doc-chapter"]'), 'document body has chapter');

});
