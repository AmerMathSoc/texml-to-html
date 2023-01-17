import getParentLevel from '../helpers/getParentLevel.js';

/**
 * subtitle element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // NOTE the subtitle is also touched in label.js (which creates a header as htmlParent)
  const p = this.createNode('p', '', { 'data-ams-doc': 'subtitle' });
  htmlParentNode.appendChild(p);
  this.passThrough(p, xmlnode);
};
