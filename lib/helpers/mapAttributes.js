const attributeDictionary = {
  class: 'class', // NOTE should only appear on table elements
  id: 'id',
  rowspan: 'rowspan',
  colspan: 'colspan',
  'content-type': 'data-ams-content-type',
  'has-qed-box': 'data-ams-qed-box',
  hidden: 'hidden',
  style: 'data-ams-style',
  'specific-use': 'data-ams-specific-use' // NOTE generic fallback; elementProcessors who do something different should remove the attribute from the xmlnode before calling mapAttributes
};

/**
 * Map attribute from XML to HTML element.
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 * @param {String} attributeName 
 * @returns {undefined}
 */
const mapAttribute = (htmlNode, xmlNode, attributeName) => {
  const attributeValue = xmlNode.getAttribute(attributeName);
  if (!attributeValue) return;
  htmlNode.setAttribute(attributeDictionary[attributeName], attributeValue);
};

/**
 * Map admissible attributes from XML to HTML element.
 * @param {HTMLElement} htmlNode 
 * @param {Element} xmlNode 
 * @returns {undefined}
 */
const mapAttributes = (htmlNode, xmlNode) => {
  Object.keys(attributeDictionary).forEach(
    mapAttribute.bind(null, htmlNode, xmlNode)
  );
};

export default mapAttributes;
