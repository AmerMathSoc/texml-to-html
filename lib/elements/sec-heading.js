import mapAttributes from '../helpers/mapAttributes.js';

export default function (htmlParentNode, xmlnode) {
  const span = this.createNode('span', '', {
    'data-ams-doc': 'secheading'
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
    // TODO his does not match label/title punctuation where a title without label would get a period.
  }
  this.passThrough(span, title);
};
