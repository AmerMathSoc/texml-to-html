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

const sectioningDictionary = {
  part: 0,
  chapter: 0,
  section: 1,
  refhead: 1, // NOTE NOTI only
  subsection: 2,
  subsubsection: 3,
  paragraph: 4,
  subparagraph: 5,
};

/**
 * sec element, also used for many other section-like elements
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const tagName = xmlnode.tagName;
  const specificUse = xmlnode.getAttribute('specific-use');
  const articleWithPartIncrement =
    !this.isBook && xmlnode.getRootNode().querySelector('sec[specific-use="part"]')
      ? 1
      : 0;
  const hasDictionaryEntry = sectioningDictionary[specificUse] !== undefined;
  const ancestorWithLevel = htmlParentNode.closest('[data-ams-doc-level]');
  // if there is no sectioningDictionary entry, we use the ancestor to decide, if 0 or 5 is appropriate.
  // NOTE front-matter (aliased to sec()) doesn't have an ancestor.
  const level = hasDictionaryEntry
    ? sectioningDictionary[specificUse]
    : ancestorWithLevel
      ? 5
      : 0;
  const section = this.createNode('section', '', {
    'data-ams-doc-level': level + articleWithPartIncrement,
    'data-ams-doc': specificUse,
    id: xmlnode.getAttribute('id'),
  });
  htmlParentNode.appendChild(section);

  if (xmlnode.hasAttribute('style')) section.setAttribute('data-ams-style', xmlnode.getAttribute('style'));

  if (specificUse === 'part') {
    section.setAttribute('role', 'doc-part');
  }
  if (specificUse === 'chapter') {
    section.setAttribute('role', 'doc-chapter');
  }
  section.removeAttribute('specific-use');
  if (tagName === 'dedication')
    section.setAttribute('role', 'doc-dedication');

  // Acknowledgements
  const titleChild = xmlnode.querySelector('title');
  if (
    tagName === 'ack' ||
    (titleChild && titleChild.textContent.startsWith('Acknowledg'))
  ) {
    section.setAttribute('role', 'doc-acknowledgments');
  }
  if (tagName === 'ack' && !this.isBook)
    section.setAttribute('data-ams-doc-level', '1');
  if (titleChild && titleChild.textContent.startsWith('Introduction'))
    section.setAttribute('role', 'doc-introduction');

  // book appendices
  if (tagName === 'book-app-group') {
    section.setAttribute('data-ams-doc', 'app-group');
  }
  if (tagName === 'book-app' && !xmlnode.parentNode.closest('book-app')) section.setAttribute('role', 'doc-appendix'); // TODO: revisit after AmerMathSoc/texml#223

  this.createHeading(section, xmlnode);
  this.passThrough(section, xmlnode);
};
