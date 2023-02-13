/**
 * Turn author metadata into parts of a sentence.
 * @param {Object} contributors - contributors metadata object (from article- or section-metadata)
 * @returns 
 */

const createPartialByline = (contributors) => {
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    return formatter.format(Object.values(contributors).map(contributor => `${contributor.byline ? contributor.byline + ' ' : ''}${contributor.name}`));
}


/**
 * Generates Byline from contributor information. 
 * NOTE: tested via article-metadata-json.js and sec-meta.js
 * @param {Object} contributors 
 * @returns 
 */
export const generateByline = (contributors) => Object.values(contributors).map(contributorGroup => createPartialByline(contributorGroup)).join(', ');
