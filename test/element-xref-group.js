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


tape('Template: xref-group', async function (t) {
    t.plan(2);
    const xrefGroup = article.querySelector('#xrefgroup [data-ams-doc="refgroup"]');
    t.equal(xrefGroup.outerHTML, '<span data-ams-refrange="xrefgroup2 xrefgroup3" data-ams-ref="grp" data-ams-doc="refgroup"><ams-x>(</ams-x><a data-ams-ref="grp" href="#xrefgroup1">2</a><ams-x>)</ams-x>–<a data-ams-ref="grp" href="#xrefgroup4">5</a></span>', 'xrefgroup snapshot test')
    const xrefGroupMath = article.querySelector('#xrefgroup tex-math [data-ams-doc="refgroup"]');
    t.equal(xrefGroupMath.outerHTML, '<span data-ams-refrange="xrefgroup2 xrefgroup3" data-ams-ref="grp" data-ams-doc="refgroup"><ams-x>(</ams-x>\\xhref[grp]{#xrefgroup1}{2}<ams-x>)</ams-x>–\\xhref[grp]{#xrefgroup4}{5}</span>', 'xrefgroup in math mode snapshot test')
});
