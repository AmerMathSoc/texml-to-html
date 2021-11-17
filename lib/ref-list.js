const mapAttributes = require('./mapAttributes');
const getParentLevel = require('./getParentLevel');

module.exports = (recurseTheDom, passThrough, createNode) => {
  const refList = (htmlParentNode, xmlnode) => {
    // calculate document level
    const isBook = (xmlnode.ownerDocument.firstElementChild.tagName === 'book'); // TODO extract into property or function?
    const parentLevel = getParentLevel(htmlParentNode);
    let level = isBook ? '0' : '1';
    if (!Number.isNaN(parentLevel)) level = parentLevel + 1;
    // check nesting NOTE no complex nesting allowed.
    const isNestedRefList = (xmlnode.parentNode.tagName === 'ref-list');
    const containsRefList = ([...xmlnode.children].filter(node => node.tagName === 'ref-list').length > 0);
    // wrapping section to accomodate title
    const section = createNode('section', '', {
      'data-ams-doc-level': level
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    if (!isNestedRefList) {
      section.setAttribute('role', 'doc-bibliography');
    }
    if (containsRefList) {
      passThrough(section, xmlnode);
      return;
    }
    recurseTheDom(section, xmlnode.querySelector('title'));
    const dl = createNode('dl', '');
    section.appendChild(dl);
    xmlnode.querySelectorAll('ref').forEach(recurseTheDom.bind(null, dl));
  };
  return refList;
};
