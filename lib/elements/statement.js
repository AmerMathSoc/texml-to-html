import mapAttributes from '../helpers/mapAttributes.js';

/**
 * statement element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const figure = this.createNode('figure', '', {
    'data-ams-doc': 'statement',
  });
  mapAttributes(figure, xmlnode);
  htmlParentNode.appendChild(figure);
  this.passThrough(figure, xmlnode);
};
