export const setHead = (xmldoc, htmldoc) => {
    // add viewport meta tag
    const viewportmeta = htmldoc.createElement('meta');
    viewportmeta.setAttribute('name', 'viewport');
    viewportmeta.setAttribute('content', 'width=device-width');
    const isBook = xmldoc.firstElementChild.tagName === 'book'; // TODO extract into property or function?
    if (isBook) htmldoc.head.insertAdjacentElement('afterbegin', viewportmeta);
  
    // add charset meta tag
    const charset = htmldoc.createElement('meta');
    charset.setAttribute('charset', 'utf-8');
    htmldoc.head.insertAdjacentElement('afterbegin', charset);
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
  };
  