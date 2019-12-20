const getParentLevel = htmlParentNode =>
  parseInt(htmlParentNode.getAttribute('data-ams-doc-level'));

module.exports = getParentLevel;
