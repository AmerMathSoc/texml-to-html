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
      );
    htmldoc.title = xmlTitle ? xmlTitle.textContent : 'AMS Publication';
  
    const root = xmldoc.querySelector('article, book');
    const lang = root.getAttribute('xml:lang') || 'en';
    htmldoc.querySelector('html').setAttribute('lang', lang);
    htmldoc.querySelector('html').setAttribute('dir', 'ltr');
  };
  