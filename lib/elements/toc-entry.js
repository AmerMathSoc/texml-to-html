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

/**
 * toc-entry element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const li = this.createNode('li');
  htmlParentNode.appendChild(li);
  const anchor = this.createNode('a', '', {
    href: `#${xmlnode.querySelector('nav-pointer').getAttribute('rid')}`,
  });
  li.appendChild(anchor);
  // NOTE unify label/title processing with label() - requires some form of new wrapper around content in lieu of heading (or have it add the anchor but then the nav-pointer will be odd to pull in). See #398
  // NOTE [...].find() HACK for bug with ':scope > ...', jsdom/jsdom#2998
  const label = xmlnode.querySelector(':scope>label');
  const title = xmlnode.querySelector(':scope>title');
  const altTitle = xmlnode.querySelector(':scope>alt-title');
  if (label && label.innerHTML.trim() !== '') {
    this.passThrough(anchor, label);
    anchor.insertAdjacentText('beforeend', '. ');
  }
  if (altTitle) {
    const altTitleContent = altTitle.textContent;
    anchor.setAttribute(
      'data-ams-doc-alttitle',
      anchor.textContent + altTitleContent
    );
  }
  if (title) this.passThrough(anchor, title);
  // NOTE we expect very simple markup: one contrib group, string-names only
  const contribGroup = xmlnode.querySelector(':scope>contrib-group');
  if (contribGroup) {
    const names = [...contribGroup.querySelectorAll('string-name')];
    if (names.length > 0) li.insertAdjacentHTML('beforeend', '<br>');
    li.insertAdjacentHTML(
      'beforeend',
      names.map((node) => `<em>${node.textContent}</em>`).join(', ')
    );
  }
  if (!xmlnode.querySelector('toc-entry')) return;
  // nested toc-entries means we have a sub-toc
  const ol = this.createNode('ol');
  li.appendChild(ol);
  [...xmlnode.childNodes]
    .filter((node) => node.tagName === 'toc-entry')
    .forEach(this.recurseTheDom.bind(null, ol));
};
