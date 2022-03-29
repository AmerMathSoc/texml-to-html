export default function (htmlParentNode, xmlnode) {
  htmlParentNode.appendChild(this.createNode('dt', 'Keywords'));
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  const ul = this.createNode('ul');
  dd.appendChild(ul);
  this.passThrough(ul, xmlnode);
};
