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


tape('Template: fig, fig-group, caption, label', async function(t) {
  t.plan(12);
  const document = article;
  const figurePosition = document.querySelector('#figures figure#position');
  t.equal(figurePosition.getAttribute('data-ams-position'), 'anchor', 'Figure with data-ams-position attribute');
  t.notOk(figurePosition.getAttribute('role'), 'Figure has no explicit role');
  const labels = document.querySelectorAll('#figures figure strong');
  t.equal(labels[0].innerHTML, 'Label 1<ams-x>.</ams-x>', 'Fig label with caption gets period');
  t.equal(labels[1].innerHTML, 'Grouplabel 1', 'Fig-group label with caption gets period');
  t.equal(labels[2].innerHTML,'Sublabel 1', 'Subfigure label with caption gets parentheses');
  t.equal(labels[3].innerHTML,'Label 2', 'Fig label without caption gets period');
  t.equal(labels[4].innerHTML, 'Grouplabel 2', 'Fig-group label without caption gets period');
  t.equal(labels[5].innerHTML, 'Sublabel 2', 'Subfigure label without caption gets parentheses');
  t.notOk(figurePosition.nextElementSibling.hasAttribute('id'), 'Fig without id does not create a (bad) id');
  t.notOk(figurePosition.nextElementSibling.getAttribute('data-ams-position'), 'Fig without position does not create a (bad) data attribute');
  t.equal(figurePosition.nextElementSibling.getAttribute('data-ams-specific-use'), 'special', 'Fig with specific-use');
  t.ok(document.querySelector('figure#figattrib figcaption span'), 'Fig: attrib moved into figcaption');
});
