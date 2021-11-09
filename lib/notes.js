const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const notes = (htmlParentNode, xmlnode) => {
    const isBook = xmlnode.ownerDocument.firstElementChild.tagName === 'book'; // TODO extract into property or function?

    const section = createNode('section');
    mapAttributes(section, xmlnode);
    const notesType = xmlnode.getAttribute('notes-type');
    section.setAttribute('data-ams-doc', 'notes');
    section.setAttribute('data-ams-content-type', notesType);
    if (notesType === 'dedication')
      section.setAttribute('role', 'doc-dedication');
    htmlParentNode.appendChild(section);
    if (isBook) section.setAttribute('data-ams-doc-level', '0');

    passThrough(section, xmlnode);
  };
  return notes;
};
