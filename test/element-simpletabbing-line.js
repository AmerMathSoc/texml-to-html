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


tape('Template: simpletabbing, line', async function(t) {
  t.plan(4);
  const document = book;
  const tabbing = document.querySelector('section#simpletabbing');
  t.equal(tabbing.getAttribute('data-ams-doc'), 'simpletabbing', 'Tabbing as section with data-ams-doc attribute');
  const lines = document.querySelectorAll('section#simpletabbing > p');
  t.equal(lines[0].getAttribute('data-ams-doc'), 'line', 'Line as p with data-ams-doc');
  t.equal(lines[0].id, 'simpletabbing-line', 'Line id preserved');
  t.equal(lines[1].getAttribute('data-ams-indent'), '1', 'Line with indent s data-ams-indent');
});
