module.exports = (passThrough, createNode) => {
  const mixedCitation = (htmlParentNode, xmlnode) => {
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    const div = createNode('div', '', { role: 'doc-biblioentry' });
    dd.appendChild(div);
    // NOTE xslt would map attributes but we have no content with attributes on mixed-citations
    passThrough(div, xmlnode);
    const rawCitation = xmlnode.parentNode.querySelector('raw-citation');
    if (!rawCitation) return;
    const code = createNode('code', rawCitation.textContent, {
      'data-ams-doc': 'amsref'
    });
    div.appendChild(code);
  };
  return mixedCitation;
};
