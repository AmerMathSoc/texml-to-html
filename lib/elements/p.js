import mapAttributes from '../helpers/mapAttributes.js';

export default function (htmlParentNode, xmlnode) {
    let paragraph = this.createNode('p');
    if (htmlParentNode.closest('p'))
      paragraph = this.createNode('span', '', {
        'data-ams-doc': 'paragraph'
      });
    mapAttributes(paragraph, xmlnode);
    htmlParentNode.appendChild(paragraph);
    this.passThrough(paragraph, xmlnode);
  };
