const {DOMParser} = require('linkedom');

exports.xmlDom = (xmlstring = '') => (new DOMParser).parseFromString(xmlstring, 'text/xml' ).defaultView;
exports.htmlDom = (htmlstring = '<!DOCTYPE html> <html lang="en"><head><title></title></head><body></body> </html>') => (new DOMParser).parseFromString(htmlstring, 'text/html').defaultView;
