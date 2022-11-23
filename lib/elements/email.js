/**
 * email element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const text = xmlnode.textContent;
  htmlParentNode.appendChild(
    this.createNode('a', text, { href: `mailto://${text}` })
  );
  if (
    xmlnode.nextElementSibling &&
    xmlnode.nextElementSibling.tagName === 'email'
  )
    htmlParentNode.insertAdjacentText('beforeend', ', ');
};
