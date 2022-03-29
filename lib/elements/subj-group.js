export default function (htmlParentNode, xmlnode) {
  htmlParentNode.appendChild(
    this.createNode('dt', `Subjects`)
  );
  xmlnode
    .querySelectorAll('subject')
    .forEach(this.recurseTheDom.bind(null, htmlParentNode));
};
