export default function (htmlParentNode, xmlnode) {
  const paragraph = this.createNode('p', '', {
    'data-ams-doc': xmlnode.tagName,
  });
  if (xmlnode.hasAttribute('id')) paragraph.id = xmlnode.getAttribute('id');
  if (xmlnode.hasAttribute('indent'))
    paragraph.setAttribute('data-ams-indent', xmlnode.getAttribute('indent'));
  htmlParentNode.appendChild(paragraph);
  this.passThrough(paragraph, xmlnode);
};
