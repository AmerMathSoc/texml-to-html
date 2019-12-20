module.exports = (createNode) => {
  const contribId = (htmlParentNode, xmlnode) => {
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    const format = xmlnode.getAttribute('contrib-id-type');
    let text = 'Unknown Type';
    if (format === 'orcid') text = 'ORCID';
    else if (format === 'mrauth') text = 'MathSciNet';
    dd.appendChild(
      createNode('a', text, { href: xmlnode.textContent })
    );
  };
  return contribId;
};
