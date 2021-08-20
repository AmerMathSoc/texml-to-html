const jsdom = require('jsdom');
const { JSDOM } = jsdom;

exports.xmlDom = (xmlstring = '') => new JSDOM(xmlstring, { contentType: 'text/xml' });
exports.htmlDom = (htmlstring = '') => new JSDOM(htmlstring);
