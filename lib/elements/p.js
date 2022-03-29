import mapAttributes from '../helpers/mapAttributes.js';

export default (passThrough, createNode) => {
  const p = (htmlParentNode, xmlnode) => {
    let paragraph = createNode('p');
    if (htmlParentNode.closest('p'))
      paragraph = createNode('span', '', {
        'data-ams-doc': 'paragraph'
      });
    mapAttributes(paragraph, xmlnode);
    htmlParentNode.appendChild(paragraph);
    passThrough(paragraph, xmlnode);
  };
  return p;
};
