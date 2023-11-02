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


tape('Template: funding-group, funding-statement', async function(t) {
  t.plan(2);
  const document = article;
  let fundinggroup = document.querySelector('div[data-ams-doc="funding-group"]')
  t.ok(fundinggroup, 'funding-group produces div with data-ams-doc');
  t.equal(fundinggroup.querySelectorAll('p').length, 2, 'funding-group contains paragraph for each funding-statement');
});

