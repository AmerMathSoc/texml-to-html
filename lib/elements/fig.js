import mapAttributes from '../helpers/mapAttributes.js';

/**
 * fig element, also used for fig-group, verse-group, table-wrap, table-wrap-group
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const figure = this.createNode('figure', '', {
    'data-ams-doc': xmlnode.tagName
  });
  if (xmlnode.getAttribute('position')) figure.setAttribute('data-ams-position', xmlnode.getAttribute('position'));
  mapAttributes(figure, xmlnode);
  htmlParentNode.appendChild(figure);
  this.passThrough(figure, xmlnode);
};
