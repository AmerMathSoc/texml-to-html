// Usage: `$ node cli.js texmlOutput.xml
import fs from 'fs';
import path from 'path';
import texml2html from '../texml-to-html.js';

console.log(texml2html(fs.readFileSync(path.resolve(process.argv[2])).toString()).window.document.toString());
