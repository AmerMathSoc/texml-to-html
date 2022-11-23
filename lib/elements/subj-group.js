/**
 * subj-group element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  htmlParentNode.appendChild(
    this.createNode('dt', `Subjects`)
  );
  xmlnode
    .querySelectorAll('subject')
    .forEach(this.recurseTheDom.bind(null, htmlParentNode));
};
