import mapAttributes from '../helpers/mapAttributes.js';
import getParentLevel from '../helpers/getParentLevel.js';

/**
 * secheading element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const parentLevel = getParentLevel(htmlParentNode) || '5';
  const span = this.createNode('span', '', {
    'data-ams-doc': 'secheading',
    'data-ams-doc-level': parentLevel+1,
  });
  mapAttributes(span, xmlnode);

  htmlParentNode.appendChild(span);
  const label = xmlnode.querySelector('label');
  const title = xmlnode.querySelector('title');
  if (label) {
    this.passThrough(span, label);
  }
  if (title && label) {
    span.insertAdjacentText('beforeend', '. ');
    // NOTE this does not match label/title punctuation where a title without label would get a period.
  }
  this.passThrough(span, title);
};
