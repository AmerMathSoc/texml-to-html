const attributeDictionary = {
  id: 'id',
  rowspan: 'rowspan',
  colspan: 'colspan',
  'content-type': 'data-ams-content-type',
  'has-qed-box': 'data-ams-qed-box',
  hidden: 'hidden',
  style: 'data-ams-style',
  'specific-use': 'data-ams-specific-use' // NOTE generic fallback; elementProcessors who do something different should remove the attribute from the xmlnode before calling mapAttributes
};

const mapAttribute = (htmlNode, xmlNode, attributeName) => {
  const attributeValue = xmlNode.getAttribute(attributeName);
  if (!attributeValue) return;
  htmlNode.setAttribute(attributeDictionary[attributeName], attributeValue);
};

const mapAttributes = (htmlNode, xmlNode) => {
  Object.keys(attributeDictionary).forEach(
    mapAttribute.bind(null, htmlNode, xmlNode)
  );
};

module.exports = mapAttributes;
