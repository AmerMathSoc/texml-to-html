const getParentLevel = htmlParentNode =>
  parseInt(htmlParentNode.getAttribute('data-ams-doc-level'));

export default getParentLevel;
