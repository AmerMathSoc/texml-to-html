const mapAttributes = require('./mapAttributes');
const getParentLevel = require('./getParentLevel');

module.exports = (recurseTheDom, createNode) => {
  const refList = (htmlParentNode, xmlnode) => {
    const isBook = xmlnode.closest('book'); // TODO
    const parentLevel = getParentLevel(htmlParentNode);
    let level = isBook ? '0' : '1';
    if (!Number.isNaN(parentLevel)) level = parentLevel + 1;
    const section = createNode('section', '', {
      role: 'doc-bibliography',
      'data-ams-doc-level': level
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    recurseTheDom(section, xmlnode.querySelector('title'));
    const dl = createNode('dl', '');
    section.appendChild(dl);
    xmlnode.querySelectorAll('ref').forEach(recurseTheDom.bind(null, dl));
  };
  return refList;
};
