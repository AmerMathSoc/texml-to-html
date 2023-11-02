/*!
 *  Copyright (c) 2023 American Mathematical Society
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
