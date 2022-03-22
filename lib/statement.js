import mapAttributes from './mapAttributes.js';

export default (passThrough, createNode) => {
  const statement = (htmlParentNode, xmlnode) => {
    // NOTE doesn't use getParentLevel because statements may also appear in list items
    let ancestorWithLevel = htmlParentNode.closest('[data-ams-doc-level]');
    const ancestorLevel = ancestorWithLevel
      ? parseInt(ancestorWithLevel.getAttribute('data-ams-doc-level'))
      : 4; // NOTE Magic Number 4 because 4+1=5 below (and thus we get an h6)
    const figure = createNode('figure', '', {
      'data-ams-doc': 'statement',
      'data-ams-doc-level': // TODO remove?
        htmlParentNode.getAttribute('data-ams-doc') === 'statement'
          ? ancestorLevel
          : ancestorLevel + 1
    });
    mapAttributes(figure, xmlnode);
    htmlParentNode.appendChild(figure);
    passThrough(figure, xmlnode);
  };
  return statement;
};
