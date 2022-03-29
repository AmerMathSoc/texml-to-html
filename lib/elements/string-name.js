export default function (htmlParentNode, xmlnode) {
    const span = this.createNode('span', '', {
      'data-ams-doc': 'stringname'
    });
    htmlParentNode.appendChild(span);
    this.passThrough(span, xmlnode);
  };
