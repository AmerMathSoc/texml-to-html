export default function (htmlParentNode, xmlnode) {
    const label = [...xmlnode.children].find( node => node.tagName === 'label');
    const figure = this.createNode('figure', '', {
      'data-ams-doc': 'statement',
      'data-ams-content-type': 'disp-formula-group',
      id: xmlnode.id,
    });
    htmlParentNode.appendChild(figure);
    this.passThrough(figure, xmlnode);
  };
