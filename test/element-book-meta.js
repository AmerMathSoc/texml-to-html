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

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonSnapshot = require('./book-meta-snapshot.json');

tape('Template: book-meta', async function (t) {
  t.plan(2);

  const document = book;
  const titlepage = document.querySelector('section[data-ams-doc="titlepage"]');
  t.ok(titlepage, 'book-meta creates section with data-ams-doc=titlepage');
 
  const jsonScript = titlepage.querySelector('script[type="application/json"]');
  const jsonData = JSON.parse(jsonScript.textContent);

  t.deepEqual(jsonData, jsonSnapshot, 'JSON metadata');

});
