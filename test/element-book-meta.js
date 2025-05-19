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


import { book, bookMetadata } from './helper.js';
import tape from 'tape';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonSnapshot = require('./book-meta-snapshot.json');
const jsonSnapshot2 = require('./book--metadata-meta-snapshot.json');

tape('Template: book-meta', async function (t) {
  t.plan(8);

  const document = book;
  const titlepage = document.querySelector('section[data-ams-doc="titlepage"]');
  t.ok(titlepage, 'book-meta creates section with data-ams-doc=titlepage');
 
  const jsonScript = titlepage.querySelector('script[type="application/json"]');
  const jsonData = JSON.parse(jsonScript.textContent);

  t.deepEqual(jsonData, jsonSnapshot, 'JSON metadata for book.xml');

  const document2 = bookMetadata;
  const jsonScript2 = document2.querySelector('script[type="application/json"]');
  const jsonData2 = JSON.parse(jsonScript2.textContent);

  t.deepEqual(jsonData2, jsonSnapshot2, 'JSON metadata book-metadata.xml');

  const abstractWrapper = document2.querySelector('[data-ams-doc="abstract"]');
  t.ok(abstractWrapper, 'book-meta creates wrapper for abstract');
  t.ok(abstractWrapper.querySelector(':scope > [role="doc-abstract"]'), 'wrapper for abstract contains abstract');
  t.ok(abstractWrapper.querySelector(':scope > [data-ams-doc="keywords"]'), 'wrapper for abstract contains keywords');
  t.ok(abstractWrapper.querySelector(':scope > [data-ams-doc="MSC 2020"]'), 'wrapper for abstract contains MSCs');
  t.ok(abstractWrapper.querySelector(':scope > [data-ams-doc="funding-group"]'), 'wrapper for abstract contains funding statement');
});
