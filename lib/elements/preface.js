import mapAttributes from '../helpers/mapAttributes.js';

export default function (htmlParentNode, xmlnode) {
  // NOTE should only occur in books
  const preface = this.createNode('section', '', {
    role: 'doc-preface',
    'data-ams-doc-level': 0
  });
  mapAttributes(preface, xmlnode);
  htmlParentNode.appendChild(preface);
  this.passThrough(preface, xmlnode);
};
