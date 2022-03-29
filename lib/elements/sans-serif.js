import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

export default function (htmlParentNode, xmlnode) {
        if (xmlnode.closest("tex-math")) {
            htmlParentNode.insertAdjacentText("beforeend", `\\textsf{`);
            replaceTeXCharactersInNodes(xmlnode);
            this.passThrough(htmlParentNode, xmlnode);
            htmlParentNode.insertAdjacentText("beforeend", `}`);
            return;
        }
        const span = this.createNode("span", "", {
            "data-ams-style": xmlnode.tagName,
        });
        htmlParentNode.appendChild(span);
        this.passThrough(span, xmlnode);
    };
