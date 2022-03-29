import {generateBookJson} from './book-meta-json.js';

export default function (htmlParentNode, xmlnode) {
    const titlepage = this.createNode('section', '', {
      'data-ams-doc': 'titlepage'
    });
    htmlParentNode.appendChild(titlepage);

    const script = this.createNode('script', '', {type: "application/json"});
    titlepage.append(script);
    script.textContent = generateBookJson(this.recurseTheDom, this.passThrough, this.createNode, xmlnode);
  };
