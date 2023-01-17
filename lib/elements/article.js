/**
 * article element (JATS root); creates data-ams-doc="article"
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const artSection = this.createNode('section', '', {
    'data-ams-doc': 'article',
  });
  htmlParentNode.appendChild(artSection);
  this.passThrough(artSection, xmlnode);
};
