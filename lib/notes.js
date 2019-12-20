module.exports = (passThrough, createNode) => {
  const notes = (htmlParentNode, xmlnode) => {
    // so far, we only have one type
    if (xmlnode.getAttribute('notes-type') !== 'dedication') return;
    const div = createNode('div', '', { role: 'doc-dedication' });
    htmlParentNode.appendChild(div);
    passThrough(div, xmlnode);
  };
  return notes;
};
