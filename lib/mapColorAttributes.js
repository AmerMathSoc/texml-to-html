const mapColorAttributes = (htmlnode, xmlnode) => {
    const colors = [];
    if (xmlnode.hasAttribute('text-color')) colors.push(`color:${xmlnode.getAttribute('text-color')};`);
    if (xmlnode.hasAttribute('background-color')) colors.push(`background-color:${xmlnode.getAttribute('background-color')};`);
    if (xmlnode.hasAttribute('border-color')) {
        colors.push(`border-color:${xmlnode.getAttribute('border-color')};`);
        colors.push(`border-width:medium;`);
    }
    if (colors.length) htmlnode.setAttribute('data-ams-style-color', colors.join(''));
}

exports.mapColorAttributes = mapColorAttributes;
