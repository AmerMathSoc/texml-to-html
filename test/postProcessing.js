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


tape('postProcessing.js', async function (t) {
    t.plan(4);
    const document = article;

    t.equal(document.querySelector('#contentModel-1').innerHTML.trim(), `<p>
                    text node
                    </p><dl>
                        <div>
                            <dt>1</dt>
                            <dd><p></p></dd>
                        </div>
                    </dl><dl>
                        <div>
                            <dt>2</dt>
                            <dd><p></p></dd>
                        </div>
                    </dl>`, 'Paragraph with text and DL: DL moved out of paragraph (snapshot)');

    t.equal(document.querySelector('#contentModel-2').innerHTML.trim(), '<dl>\n                    </dl>', 'Paragraph with only DL: DL is moved out, paragraph is trimmed (snapshot)');

    t.equal(document.querySelector('#contentModel-3').innerHTML.trim(), `<p>1</p><p>2</p><p>3</p>`, 'Paragraph with text+paragraph+text split into 3 paragraphs (snapshot)');

    t.equal(document.querySelector('cite-group').parentNode.tagName, 'P', 'Custom elements remain in paragraph');
});

