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

// From https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content
// Note: 'a', 'del', 'ins', 'link', 'map', 'meta' have additional constraints that we ignore since they shouldn't occur in our content
const phrasingContentTags = ['abbr', 'audio', 'b', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'kbd', 'label', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'picture', 'progress', 'q', 'ruby', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'textarea', 'time', 'u', 'var', 'video', 'wbr', 'a', 'del', 'ins', 'link', 'map', 'meta']
/**
 * Moves non-phrasing content out of paragraph node. Works around texml#104 
 * @param {HTMLElement} node 
 */
const sanitizeParagraph = node => {
    const childrenArray = [...node.children];
    const maybeBadChild = childrenArray.find(child => (!child.tagName.includes('-') && !phrasingContentTags.includes(child.tagName.toLowerCase())));  // check for content that is not phrasing conetnt and not a custom element name.
    if (!maybeBadChild) return;
    console.log(`Info: texml-to-html: fixing non-phrasing in paragraph, cf. texml#104, near ID ${node.closest('[id]')?.getAttribute('id')}`)
    const remainingChildren = childrenArray.slice(childrenArray.indexOf(maybeBadChild)).reverse();
    remainingChildren.forEach(child => node.insertAdjacentElement('afterend', child));
    if (node.innerHTML.trim() === '') {
        node.remove();
    }
}

/**
 * Wrapper around hacks
 * @param {Document} document 
 */
export const applyHacks = document => {
    // workaround texml#104
    document.querySelectorAll('p').forEach(sanitizeParagraph);
}
