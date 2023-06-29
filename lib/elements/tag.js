import { node2macro, } from '../helpers/helpers-tex.js';

/**
 * tag element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
    if (!xmlnode.closest('tex-math')) return; // NOTE: <tag> should only appear in <tex-math> in disp-formula


    // rewrite to macro
    const macroName = (xmlnode.getAttribute('parens') === 'yes') ? 'tag' : 'tag*';
    node2macro.apply(this, [htmlParentNode, xmlnode, macroName]);

    // tag extraction
    // if some tag in the equation is linked, we store all tags as part of a JSON array in the data-ams-tag attribute on the HTML parent
    if (!xmlnode.closest('disp-formula').querySelector('target tag')) return;
    const tagArray = htmlParentNode.hasAttribute('data-ams-tags') ? JSON.parse(htmlParentNode.getAttribute('data-ams-tags')) : [];
    tagArray.push(this.passthroughIntoHTMLString(xmlnode)); // NOTE we only need passThroughIntoHTMLString here, i.e., we don't need to escape active TeX characters, because node2macro already ran and modified xmlnode
    htmlParentNode.setAttribute('data-ams-tags', JSON.stringify(tagArray));
};
