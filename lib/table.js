module.exports = (createNode, copyElement) => {
  const table = (htmlParentNode, xmlnode) => {
    const div = createNode('div', '', {
      'data-ams-doc': `table-wrap`,
    });
    htmlParentNode.appendChild(div);
    copyElement(div, xmlnode);
  };
  return table;
};
