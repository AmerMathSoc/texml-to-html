/*!
 *  Copyright (c) 2026 American Mathematical Society
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
    appendix: 0,
    section: 1,
    refhead: 1, // NOTE NOTI only
    subsection: 2,
    subsubsection: 3,
    paragraph: 4,
    subparagraph: 5,
};

/**
 * Calculate the heading level (by dictionary or ancestor)
 * @param {HTMLElement} htmlParentNode
 * @param {Element} xmlnode 
 */
const calculateHeadingLevel = function (htmlParentNode, xmlnode) {
    let specificUse = xmlnode.getAttribute('specific-use');
    if (specificUse === 'section untagged') specificUse = 'section';
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
    return level + articleWithPartIncrement;
}

export default calculateHeadingLevel;
