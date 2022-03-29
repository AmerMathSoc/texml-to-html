export default function (htmlParentNode, xmlnode) {
    const node = this.createNode('u');
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
  };
