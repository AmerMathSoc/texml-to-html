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
 * Maps color attributes on XML element to (combined) style declaration on HTML element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export const mapColorAttributes = (htmlnode, xmlnode) => {
    const colors = [];
    if (xmlnode.hasAttribute('text-color')) colors.push(`color:${xmlnode.getAttribute('text-color')};`);
    if (xmlnode.hasAttribute('background-color')) colors.push(`background-color:${xmlnode.getAttribute('background-color')};`);
    if (xmlnode.hasAttribute('border-color')) {
        colors.push(`border-color:${xmlnode.getAttribute('border-color')};`);
    }
    if (xmlnode.hasAttribute('border-width')) {
        colors.push(`border-width:${xmlnode.getAttribute('border-width')};`);
    }
    if (xmlnode.hasAttribute('border-style')) {
        colors.push(`border-style:${xmlnode.getAttribute('border-style')};`);
    }
    if (colors.length) htmlnode.setAttribute('data-ams-style-color', colors.join(''));
}
