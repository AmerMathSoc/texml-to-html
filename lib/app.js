const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const app = (htmlParentNode, xmlnode) => {
    const isBook = xmlnode.closest('book'); // TODO extract into property or function?
    // if book
    if (isBook) {
      // NOTE (from xslt) app only applies in books since articles always have app within app-group (cf. template for app-group/app above) -->
      // TODO (from xslt) (BREAKING CHANGE) remove app-group/app and make app-group pass-through - the role should be on each app, not on wrapper from app-group; but watch out for app with Acknowledgements. -->
      // NOTE (from xslt) should we add data-ams-doc-level="{@disp-level}" data-ams-doc="{@specific-use}"? We expect them for heading level computation. -->
      const section = createNode('section', '', {
        role: 'doc-appendix',
        'data-ams-doc-level': 0
      });
      htmlParentNode.appendChild(section);
      mapAttributes(section, xmlnode);
      passThrough(section, xmlnode);
      return;
    }
    // if article
    const section = createNode('section', '', {
      'data-ams-doc-level': '1'
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(section, xmlnode);
  };
  return app;
};
