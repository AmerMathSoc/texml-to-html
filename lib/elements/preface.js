import mapAttributes from '../helpers/mapAttributes.js';

export default (passThrough, createNode) => {
  const preface = (htmlParentNode, xmlnode) => {
    // NOTE should only occur in books
    const preface = createNode('section', '', {
      role: 'doc-preface',
      'data-ams-doc-level': 0
    });
    mapAttributes(preface, xmlnode);
    htmlParentNode.appendChild(preface);
    passThrough(preface, xmlnode);
  };

  return preface;
};
