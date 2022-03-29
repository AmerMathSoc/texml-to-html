import { mapColorAttributes } from '../helpers/mapColorAttributes.js';

export default function (htmlParentNode, xmlnode) {
  const span = this.createNode('span', '');
  // handle style-type NOTE current values: sans-serif, oblique
  if (xmlnode.hasAttribute('style-type')) span.setAttribute('data-ams-style', xmlnode.getAttribute('style-type'));
  // handle color attributes
  mapColorAttributes(span, xmlnode);
  htmlParentNode.appendChild(span);
  this.passThrough(span, xmlnode);
};
