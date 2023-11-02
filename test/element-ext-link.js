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


import { article } from './helper.js';
import tape from 'tape';


tape('Template: ext-link', async function (t) {
  t.plan(3);
  const document = article;
  const extlink = document.querySelector('a[href="https://"]');
  t.ok(extlink, 'Element ext-link becomes a with href');
  t.notOk(document.querySelector('a[href="https://nested2"] a'), 'ext-link with xref inside does not produce nested link');
  t.ok(document.querySelector('a[href="https://nested2"]+span').querySelector('a[data-ams-ref="nested"]'), 'xref inside ext-link moved after ext-link');
});

