import { generateArticleJson } from './article-metadata-json.js';

/**
 * front element => data-ams-doc="frontmatter"
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
    const frontmatterSection = this.createNode('section', '', {
        'data-ams-doc': 'frontmatter',
    });
    htmlParentNode.appendChild(frontmatterSection);

    // NOTE: we DO NOT recurse into the front element.
    // Most of the metadata-like descendants are stored in a JSON blob (for easier use downstream).
    // In addition to the JSON blob, we process specific elements so that they remain in HTML. The main reasons are:
    // - document content (e.g., title, abstract, dedication)
    // - elements with tex-math content (to more easily process it downstream)

    // JSON metadata - handles (most of) article-meta, journal-meta
    const script = this.createNode('script', '', { type: "application/json" });
    frontmatterSection.append(script);
    script.textContent = generateArticleJson.call(this, xmlnode);

    // title-group (title, subtitle); may have tex-math
    this.recurseTheDom(
        frontmatterSection,
        xmlnode.querySelector('front>article-meta>title-group')
    );

    // notes (e.g., dedication); may have tex-math
    xmlnode.querySelectorAll('notes').forEach(this.recurseTheDom.bind(null, frontmatterSection));


    // abstract; may have tex-math
    this.recurseTheDom(
        frontmatterSection,
        xmlnode.querySelector('front>article-meta>abstract')
    );

    // kwd-groups (MSC, keywords); may have tex-math
    xmlnode.querySelectorAll('article-meta>kwd-group').forEach(this.recurseTheDom.bind(null, frontmatterSection));

    // funding-groups; may have tex-math
    xmlnode.querySelectorAll('article-meta>funding-group').forEach(this.recurseTheDom.bind(null, frontmatterSection));

    // NOTE: we DO NOT recurse into front - see the earlier comments
}
