import mapAttributes from '../helpers/mapAttributes.js';

/**
 * notes element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const section = this.createNode('section');
  mapAttributes(section, xmlnode);
  const notesType = xmlnode.getAttribute('notes-type');
  section.setAttribute('data-ams-doc', 'notes');
  section.setAttribute('data-ams-content-type', notesType);
  if (notesType === 'dedication')
    section.setAttribute('role', 'doc-dedication');
  htmlParentNode.appendChild(section);
  if (this.isBook) section.setAttribute('data-ams-doc-level', '0');

  this.passThrough(section, xmlnode);
};
