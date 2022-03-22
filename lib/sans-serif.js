import { replaceTeXCharactersInNodes } from './helpers-tex.js';

export default (passThrough, createNode) => {
    const sansSerif = (htmlParentNode, xmlnode) => {
        if (xmlnode.closest("tex-math")) {
            htmlParentNode.insertAdjacentText("beforeend", `\\textsf{`);
            replaceTeXCharactersInNodes(xmlnode);
            passThrough(htmlParentNode, xmlnode);
            htmlParentNode.insertAdjacentText("beforeend", `}`);
            return;
        }
        const span = createNode("span", "", {
            "data-ams-style": xmlnode.tagName,
        });
        htmlParentNode.appendChild(span);
        passThrough(span, xmlnode);
    };
    return sansSerif;
};
