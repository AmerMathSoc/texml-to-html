/**
 * article-id element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const idType = xmlnode.getAttribute('pub-id-type');
  if (idType !== 'doi' && idType !== 'mr') return; // NOTE there's also "pii" but we only use those 2 values right now
  const isDOI = idType === 'doi';
  const litext = isDOI ? 'DOI ' : '';
  const li = this.createNode('li', litext);
  htmlParentNode.appendChild(li);
  const xmltext = xmlnode.textContent;
  const url = isDOI
    ? 'https://doi.org/' + xmltext
    : 'http://www.ams.org/mathscinet-getitem?mr=' + xmltext;
  li.appendChild(
    this.createNode('a', isDOI ? xmltext : `MathSciNet Review: ${xmltext}`, {
      href: url
    })
  );
};
