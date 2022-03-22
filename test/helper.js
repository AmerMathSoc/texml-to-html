import fs from 'fs';
import path from 'path';
import xml2html from '../ams-xml-to-html.js';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const article = xml2html(fs.readFileSync(path.resolve(__dirname, 'article.xml'))).window.document;
export const articleAlttitle = xml2html(fs.readFileSync(path.resolve(__dirname, 'article--alttitle.xml'))).window.document;
export const articleNometa = xml2html(fs.readFileSync(path.resolve(__dirname, 'article--nometa.xml'))).window.document;
export const book = xml2html(fs.readFileSync(path.resolve(__dirname, 'book.xml'))).window.document;
