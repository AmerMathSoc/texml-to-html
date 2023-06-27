# ams-xml-to-html

Converting texml-generated JATS/BITS-like XML to HTML.

The most basic use:

```js
import fs from 'fs';
import path from 'path';
import xml2html from './ams-xml-to-html.js';

const article = xml2html(fs.readFileSync(path.resolve(process.argv[2])).toString()).window.document;
console.log(article.toString());
```
