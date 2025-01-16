import fs from 'fs';
import path from 'path';
import texml2html from '../../texml-to-html.js';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const texmlTestsPath = path.join(__dirname, 'texml-tests');
const files = fs.readdirSync(texmlTestsPath);

files.forEach((file) => {
    if (!file.endsWith('.xml')) return;
    fs.writeFileSync(path.join(texmlTestsPath, path.basename(file, '.xml') + '.html'), texml2html(fs.readFileSync(path.join(texmlTestsPath, file)).toString()).window.document.toString())
});

