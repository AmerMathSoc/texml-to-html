export default function (htmlParentNode, xmlnode) {
    const dd = this.createNode('dd');
    htmlParentNode.appendChild(dd);
    const format = xmlnode.getAttribute('contrib-id-type');
    let text = 'Unknown Type';
    if (format === 'orcid') text = 'ORCID';
    else if (format === 'mrauth') text = 'MathSciNet';
    dd.appendChild(
      this.createNode('a', text, { href: xmlnode.textContent })
    );
  };
