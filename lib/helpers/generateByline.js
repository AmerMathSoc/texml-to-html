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
 * Turn author metadata into parts of a sentence.
 * @param {Object} contributors - contributors metadata object (from article- or section-metadata)
 * @returns {String}
 */

const createPartialByline = (contributors) => {
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    return formatter.format(Object.values(contributors).map(contributor => `${contributor.byline ? contributor.byline + ' ' : ''}${contributor.name}`));
}


/**
 * Generates Byline from contributor information. 
 * NOTE: tested via article-metadata-json.js and sec-meta.js
 * @param {Object} contributors 
 * @returns {String}
 */
export const generateByline = (contributors) => Object.values(contributors).map(contributorGroup => createPartialByline(contributorGroup)).join(', ');
