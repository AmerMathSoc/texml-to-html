export default function (htmlParentNode, xmlnode) {
    const section = this.createNode('section', '', {
      'data-ams-doc': xmlnode.tagName,
    });
    if (xmlnode.hasAttribute('id')) section.id = xmlnode.getAttribute('id');
    htmlParentNode.appendChild(section);
    this.passThrough(section, xmlnode);
  };
