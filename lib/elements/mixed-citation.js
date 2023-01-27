/**
 * mixed-citation element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  const div = this.createNode('div', '', { 'data-ams-doc': 'biblioentry' });
  dd.appendChild(div);
  // NOTE xslt would map attributes but we have no content with attributes on mixed-citations
  this.passThrough(div, xmlnode);
  const rawCitation = xmlnode.parentNode.querySelector('raw-citation');
  if (!rawCitation) return;
  const code = this.createNode('code', rawCitation.textContent, {
    'data-ams-doc': 'amsref'
  });
  div.appendChild(code);
};
