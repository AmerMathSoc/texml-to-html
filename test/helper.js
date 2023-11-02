/*!
 *  Copyright (c) 2023 American Mathematical Society
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import fs from 'fs';
import path from 'path';
import xml2html from '../texml-to-html.js';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const article = xml2html(fs.readFileSync(path.resolve(__dirname, 'article.xml')).toString(), { 'test.svg': 'custom dictionary alt'}).window.document;
export const articleAlttitle = xml2html(fs.readFileSync(path.resolve(__dirname, 'article--alttitle.xml')).toString()).window.document;
export const articleNometa = xml2html(fs.readFileSync(path.resolve(__dirname, 'article--nometa.xml')).toString()).window.document;
export const book = xml2html(fs.readFileSync(path.resolve(__dirname, 'book.xml')).toString()).window.document;
