export default (passThrough, createNode) => {
  const dispFormulaGroup = (htmlParentNode, xmlnode) => {
    const label = [...xmlnode.children].find( node => node.tagName === 'label');
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
