/**
 * xref-group element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
    const refType = xmlnode.getAttribute('ref-type');
    const refrange = `${xmlnode.getAttribute('first')} ${xmlnode.getAttribute('middle')} ${xmlnode.getAttribute('last')}`;
    if (xmlnode.parentNode.closest('tex-math')) {
        // NOTE: no use case so far; cf. #428 for code example
        return;
    }
    const span = this.createNode('span', '', {
        'data-ams-doc': 'refgroup',
        'data-ams-ref': refType,
        'data-ams-refrange': refrange
    });
    htmlParentNode.appendChild(span);
    this.passThrough(span, xmlnode);
};
