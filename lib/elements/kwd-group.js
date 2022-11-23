/**
 * kwd-group element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const dt = this.createNode('dt', 'Keywords');
  htmlParentNode.appendChild(dt);
  // either MSCs
  if (xmlnode.getAttribute('vocab')?.startsWith('MSC')) {
    dt.innerHTML = xmlnode.getAttribute('vocab');

    // basically msc.js
    const primaryDD = this.createNode('dd', 'Primary: ');
    htmlParentNode.appendChild(primaryDD);
    xmlnode
      .querySelectorAll('compound-kwd[content-type="primary"]')
      .forEach(this.recurseTheDom.bind(null, primaryDD));
    if (!xmlnode.querySelector('compound-kwd[content-type="secondary"]')) return;
    const secondaryDD = this.createNode('dd', 'Secondary: ');
    htmlParentNode.appendChild(secondaryDD);
    xmlnode
      .querySelectorAll('compound-kwd[content-type="secondary"]')
      .forEach(this.recurseTheDom.bind(null, secondaryDD));

    return;
  }
  // else kwd-group@type="author" (we only have the two kinds of keywords so far)
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  const ul = this.createNode('ul');
  dd.appendChild(ul);
  this.passThrough(ul, xmlnode);
};
