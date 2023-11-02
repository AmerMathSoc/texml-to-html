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
 * xref-group element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
    const refType = xmlnode.getAttribute('ref-type');
    const refrange = xmlnode.getAttribute('middle');
    if (xmlnode.parentNode.closest('tex-math')) {
        // NOTE: no use case so far; cf. #428 for code example
        return;
    }
    const span = this.createNode('span', '', {
        'data-ams-doc': 'refgroup',
        'data-ams-ref': refType,
        'data-ams-refrange': refrange
    });
    htmlParentNode.appendChild(span);
    this.passThrough(span, xmlnode);
};
