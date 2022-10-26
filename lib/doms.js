import { DOMParser } from 'linkedom';

export const xmlDom = (xmlstring = '') => (new DOMParser).parseFromString(xmlstring, 'text/xml').defaultView;
export const htmlDom = (htmlstring = '<!DOCTYPE html> <html><head><title></title></head><body></body> </html>') => (new DOMParser).parseFromString(htmlstring, 'text/html').defaultView;
