module.exports = createNode => {
  const email = (htmlParentNode, xmlnode) => {
    const text = xmlnode.textContent;
    htmlParentNode.appendChild(
      createNode('a', text, { href: `mailto://${text}` })
    );
    if (
      xmlnode.nextElementSibling &&
      xmlnode.nextElementSibling.tagName === 'email'
    )
      htmlParentNode.insertAdjacentText('beforeend', ', ');
  };
  return email;
};
