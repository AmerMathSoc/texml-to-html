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

tape('Template: book preface', async function(t) {
  t.plan(3);

  const document = book;
  const preface = document.querySelector('section[role="doc-preface"]');
  t.ok(preface, 'preface as section with role doc-preface');
  t.equal(preface.id, 'preface', 'preface preserves ID');
  t.ok(preface.querySelector('h1'), 'Preface title should become an h1');
});
