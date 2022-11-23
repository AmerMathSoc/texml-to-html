/**
 * contrib-group element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // if sec-meta in Book
  if (this.isBook && xmlnode.parentNode.tagName === 'sec-meta') {
    const p = this.createNode('p');
    htmlParentNode.appendChild(p);
    // TODO very hacky.
    // NOTE sec-meta>contrib-group>author-comment without contrib only appears in MCL01, MCL14
    const firstElementChild = xmlnode.firstElementChild;
    if (firstElementChild.tagName === 'author-comment') {
      const span = this.createNode('span');
      p.appendChild(span);
      this.passThrough(span, firstElementChild);
    }
    this.passThrough(p, xmlnode);
    return;
  }
  // if book-meta or article-meta
  const contentType = xmlnode.getAttribute('content-type');
  const contentTypeCased =
    contentType[0].toUpperCase() +
    contentType.substring(1, contentType.length - 1);
  htmlParentNode.appendChild(
    this.createNode('dt', `${contentTypeCased} Information`)
  );
  const dd = this.createNode('dd', '', {
    'data-ams-doc-contrib': `${contentType}`
  });
  // NOTE (from xslt): author-comment needs to fit in a sentence
  // TODO (from xslt): this looks very hacky; should only apply to articles (thus should test for it).
  const authorComment = xmlnode.querySelector('author-comment');
  if (authorComment)
    dd.setAttribute(
      'data-ams-doc-contrib-comment',
      authorComment.textContent
    );
  htmlParentNode.appendChild(dd);
  this.passThrough(dd, xmlnode);
};
