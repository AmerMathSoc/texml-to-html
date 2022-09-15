export default function (htmlParentNode, xmlnode) {
  const div = this.createNode('div', '', {
    'data-ams-doc': `table-wrap`, // NOTE table-wrap (now) creates figure with same attribute value; ams-html/ams-bookhtml use this div for overflow
  });
  htmlParentNode.appendChild(div);
  this.copyElement(div, xmlnode);
};
