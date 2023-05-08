// From https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content
// Note: 'a', 'del', 'ins', 'link', 'map', 'meta' have additional constraints that we ignore since they shouldn't occur in our content
const phrasingContentTags = ['abbr', 'audio', 'b', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'kbd', 'label', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'picture', 'progress', 'q', 'ruby', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'textarea', 'time', 'u', 'var', 'video', 'wbr', 'a', 'del', 'ins', 'link', 'map', 'meta']
/**
 * Moves non-phrasing content out of paragraph node. Works around texml#104 
 * @param {HTMLElement} node 
 */
const sanitizeParagraph = node => {
    const childrenArray = [...node.children];
    const maybeBadChild = childrenArray.find(child => !phrasingContentTags.includes(child.tagName.toLowerCase()));
    if (!maybeBadChild) return;
    console.log('INFO: ams-xml-to-html: fixing non-phrasing in paragraph, cf. texml#104')
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
