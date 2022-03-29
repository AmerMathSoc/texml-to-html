export default function (htmlParentNode, xmlnode) {
  const div = this.createNode('div', '', {
    'data-ams-doc': `table-wrap`,
  });
  htmlParentNode.appendChild(div);
  this.copyElement(div, xmlnode);
};
