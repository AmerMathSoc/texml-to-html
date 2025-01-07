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

/**
 * Populates the HTML document head.
 * @param {Document} xmldoc - the XML document
 * @param {Document} htmldoc - the HTML document
 */
export const setHead = (xmldoc, htmldoc) => {  
    // add charset and viewport meta tag
    htmldoc.head.insertAdjacentHTML('afterbegin', `<meta charset="utf-8"><meta content="width=device-width, initial-scale=1" name="viewport">`);
    // set title
    const xmlTitle =
      xmldoc.querySelector('front>article-meta>title-group>alt-title') ||
      xmldoc.querySelector(
        'book-meta>book-title-group>book-title, front>article-meta>title-group>article-title'
      );// NOTE title might contain complex markup (no use case yet; however e.g. surv279 has math-as-unicode). See also book-meta-json.js
    htmldoc.title = xmlTitle ? xmlTitle.textContent : 'AMS Publication';
  
    const root = xmldoc.querySelector('article, book');
    const lang = root.getAttribute('xml:lang') || 'en';
    htmldoc.querySelector('html').setAttribute('lang', lang);
    htmldoc.querySelector('html').setAttribute('dir', 'ltr');
  };
  