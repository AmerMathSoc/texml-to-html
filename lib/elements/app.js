import mapAttributes from '../helpers/mapAttributes.js';

export default function (htmlParentNode, xmlnode) {
  const isBook = xmlnode.closest('book'); // TODO extract into property or function?
  const section = this.createNode('section', '', {
    role: 'doc-appendix',
    'data-ams-doc-level': isBook ? 0 : 1,
  });
  const titleChild = xmlnode.querySelector('title');
  if (titleChild && titleChild.textContent.startsWith('Acknowledg'))
    section.setAttribute('role', 'doc-acknowledgments');
  htmlParentNode.appendChild(section);
  mapAttributes(section, xmlnode);
  this.passThrough(section, xmlnode);
};
