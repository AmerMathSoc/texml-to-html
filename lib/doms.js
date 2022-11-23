import { DOMParser } from 'linkedom';

/**
 * Create DOM for XML string
 * @param {String} xmlstring 
 * @returns {DOMImplementation}
 */
export const xmlDom = (xmlstring = '') => (new DOMParser).parseFromString(xmlstring, 'text/xml').defaultView;
/**
 * Create DOM for HTML string
 * @param {String} xmlstring 
 * @returns {DOMImplementation}
 */
export const htmlDom = (htmlstring = '<!DOCTYPE html> <html><head><title></title></head><body></body></html>') => (new DOMParser).parseFromString(htmlstring, 'text/html').defaultView;
