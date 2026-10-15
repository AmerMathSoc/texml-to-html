/*!
 *  Copyright (c) 2025 American Mathematical Society
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
const phrasingContentTags = ['abbr', 'audio', 'b', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'kbd', 'label', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'picture', 'progress', 'q', 'ruby', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'textarea', 'time', 'u', 'var', 'video', 'wbr', 'a', 's', 'del', 'ins', 'link', 'map', 'meta']

/**
 * Checks if node is an element that is not phrasing content.
 * @param {Node} node 
 * @returns Boolean
 */
const isProperFlow = node =>
    node.nodeType === 1
    && !phrasingContentTags.includes(node.tagName.toLowerCase())
    && !node.tagName.includes('-');

/**
 * Helper to remove whitespace-only elements
 * @param {HTMLElement} node 
 */
const removeIfEmpty = node => {
    if (node.innerHTML.trim() === '') node.remove();
}

/**
 * Split paragraph node into multiple nodes if it contains non-phrasing content.
 * @param {HTMLElement} node 
 */
const splitAtNonPhrasing = node => {
    const document = node.ownerDocument;
    const tagName = node.tagName.toLowerCase();
    const childNodes = [...node.childNodes];
    const properFlowChild = childNodes.find(isProperFlow);
    if (!properFlowChild) return; // NOTE: preliminary check if we split at all
    let currentNode = node; // Note: when we split, currentNode becomes the location where to move childnodes after the split
    let index = 0
    while (index < childNodes.length) {
        const child = childNodes[index];
        if (isProperFlow(child)) {
            // flow content is moved beyond the current "end"
            currentNode.insertAdjacentElement('afterend', child);
        }
        else {
            // phrasing content is placed in the current "end"
            // NOTE: this could go wrong but so far this has been sufficient
            currentNode.appendChild(child);
        }
        // preparing the continuation
        index++;
        if (!childNodes[index]) break;
        if (isProperFlow(child) && !isProperFlow(childNodes[index])) {
            // The actual splitting
            // If the current child is flow but the next child is phrasing, we create a new "end"
            const newNode = document.createElement(tagName);
            child.insertAdjacentElement('afterend', newNode);
            removeIfEmpty(currentNode);
            currentNode = newNode;
        }
        else if (isProperFlow(child)) currentNode = child; // Otherwise (i.e. next child is also flow), the current child is the new "end"
    }
    removeIfEmpty(currentNode);
}

/**
 * Wrapper around fixes for discrepancies between XML and HTML content models
 * @param {Document} document 
 */
export const fixContentModel = document => {
    document.querySelectorAll('p').forEach(splitAtNonPhrasing);
}
