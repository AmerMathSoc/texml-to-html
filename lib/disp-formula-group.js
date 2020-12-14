module.exports = (passThrough, createNode) => {
  const dispFormulaGroup = (htmlParentNode, xmlnode) => {
    const label = xmlnode.querySelector(':scope > label');
    const figure = createNode('figure', '', {
      'data-ams-doc': 'statement',
      'data-ams-content-type': 'disp-formula-group',
      id: xmlnode.id,
    });
    htmlParentNode.appendChild(figure);
    passThrough(figure, xmlnode);
  };
  return dispFormulaGroup;
};
