import mapAttributes from '../helpers/mapAttributes.js';

/**
 * app element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const section = this.createNode('section', '', {
    role: 'doc-appendix',
    'data-ams-doc-level': this.isBook ? 0 : 1,
  });
  const titleChild = xmlnode.querySelector('title');
  if (titleChild && titleChild.textContent.startsWith('Acknowledg'))
    section.setAttribute('role', 'doc-acknowledgments');
  htmlParentNode.appendChild(section);
  mapAttributes(section, xmlnode);
  this.passThrough(section, xmlnode);
};
