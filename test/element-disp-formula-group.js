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

tape('disp-formula-group', async function(t) {
  t.plan(3);
  const document = article;
  const groupChild = document.querySelector('#equations figure[data-ams-doc="statement"]#disp-formula-group');
  t.ok(groupChild, 'disp-formula-group as figure with data-ams-doc="statement" with id')
  t.equal(groupChild.firstElementChild.tagName, 'FIGCAPTION', 'disp-formula-group label');
  t.equal(groupChild.firstElementChild.innerHTML, '<span data-ams-doc="label">Formula Group</span>', 'disp-formula-group passes label along');
});
