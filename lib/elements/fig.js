import mapAttributes from '../helpers/mapAttributes.js';

export default function (htmlParentNode, xmlnode) {
    const figure = this.createNode('figure', '', {
      'data-ams-doc': xmlnode.tagName
    });
    if (xmlnode.getAttribute('position')) figure.setAttribute('data-ams-position', xmlnode.getAttribute('position'));
    mapAttributes(figure, xmlnode);
    htmlParentNode.appendChild(figure);
    this.passThrough(figure, xmlnode);
  };
