import mapAttributes from '../helpers/mapAttributes.js';

export default (passThrough, createNode) => {
  const app = (htmlParentNode, xmlnode) => {
    const isBook = xmlnode.closest('book'); // TODO extract into property or function?
    const section = createNode('section', '', {
      role: 'doc-appendix',
      'data-ams-doc-level': isBook ? 0 : 1,
    });
    const titleChild = xmlnode.querySelector('title');
    if (titleChild && titleChild.textContent.startsWith('Acknowledg'))
      section.setAttribute('role', 'doc-acknowledgments');
    htmlParentNode.appendChild(section);
    mapAttributes(section, xmlnode);
    passThrough(section, xmlnode);
  };
  return app;
};
