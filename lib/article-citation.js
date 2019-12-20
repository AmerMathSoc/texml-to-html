module.exports = createNode => {
  const articleCitation = (htmlParentNode, xmlnode) => {
    const li = createNode('li');
    htmlParentNode.appendChild(li);
    const code = createNode('code', xmlnode.textContent, {
      'data-ams-doc': 'amsref'
    });
    li.appendChild(code);
  };
  return articleCitation;
};
