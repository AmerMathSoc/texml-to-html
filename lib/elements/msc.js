export default function (htmlParentNode, xmlnode) {
  htmlParentNode.appendChild(
    this.createNode('dt', `MSC ${xmlnode.getAttribute('scheme')}`)
  );
  // NOTE if msc is present, there must be primary's and there may be secondary's
  const primaryDD = this.createNode('dd', 'Primary: ');
  htmlParentNode.appendChild(primaryDD);
  xmlnode
    .querySelectorAll('primary')
    .forEach(this.recurseTheDom.bind(null, primaryDD));
  if (!xmlnode.querySelector('secondary')) return;
  const secondaryDD = this.createNode('dd', 'Secondary: ');
  htmlParentNode.appendChild(secondaryDD);
  xmlnode
    .querySelectorAll('secondary')
    .forEach(this.recurseTheDom.bind(null, secondaryDD));
};
