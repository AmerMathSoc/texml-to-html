export default (recurseTheDom, createNode) => {
  const msc = (htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(
      createNode('dt', `MSC ${xmlnode.getAttribute('scheme')}`)
    );
    // NOTE if msc is present, there must be primary's and there may be secondary's
    const primaryDD = createNode('dd', 'Primary: ');
    htmlParentNode.appendChild(primaryDD);
    xmlnode
      .querySelectorAll('primary')
      .forEach(recurseTheDom.bind(null, primaryDD));
    if (!xmlnode.querySelector('secondary')) return;
    const secondaryDD = createNode('dd', 'Secondary: ');
    htmlParentNode.appendChild(secondaryDD);
    xmlnode
      .querySelectorAll('secondary')
      .forEach(recurseTheDom.bind(null, secondaryDD));
  };
  return msc;
};
