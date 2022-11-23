import mapAttributes from '../helpers/mapAttributes.js';
import getParentLevel from '../helpers/getParentLevel.js';

export default function (htmlParentNode, xmlnode) {
  // calculate document level
  const parentLevel = getParentLevel(htmlParentNode);
  let level = this.isBook ? '0' : '1';
  if (!Number.isNaN(parentLevel)) level = parentLevel + 1;
  // check nesting NOTE no complex nesting allowed.
  const isNestedRefList = (xmlnode.parentNode.tagName === 'ref-list');
  const containsRefList = ([...xmlnode.children].filter(node => node.tagName === 'ref-list').length > 0);
  // wrapping section to accomodate title
  const section = this.createNode('section', '', {
    'data-ams-doc-level': level
  });
  mapAttributes(section, xmlnode);
  htmlParentNode.appendChild(section);
  if (!isNestedRefList) {
    section.setAttribute('role', 'doc-bibliography');
  }
  if (containsRefList) {
    this.passThrough(section, xmlnode);
    return;
  }
  this.recurseTheDom(section, xmlnode.querySelector('title'));
  const dl = this.createNode('dl', '');
  section.appendChild(dl);
  xmlnode.querySelectorAll('ref').forEach(this.recurseTheDom.bind(null, dl));
};
