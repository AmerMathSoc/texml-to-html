const generateBookJson = require('./book-meta-json.js').generateBookJson;

module.exports = (recurseTheDom, passThrough, createNode) => {
  const bookMeta = (htmlParentNode, xmlnode) => {
    const titlepage = createNode('section', '', {
      'data-ams-doc': 'titlepage'
    });
    htmlParentNode.appendChild(titlepage);

    const script = createNode('script', '', {type: "application/json"});
    titlepage.append(script);
    script.textContent = generateBookJson(recurseTheDom, passThrough, createNode, xmlnode);
  };
  return bookMeta;
};
