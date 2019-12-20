module.exports = (passThrough, createNode) => {
  const preface = (htmlParentNode, xmlnode) => {
    console.log(this);
    // NOTE should only occur in books
    const preface = createNode('section', '', {
      role: 'doc-preface',
      'data-ams-doc-level': 0
    });
    htmlParentNode.appendChild(preface);
    passThrough(preface, xmlnode);
  };

  return preface;
};
