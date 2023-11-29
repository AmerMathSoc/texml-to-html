# texml-to-html

Converting [texml](https://github.com/AmerMathSoc/texml)-generated JATS/BITS-like XML to HTML.

## Getting started

### Quick example

For a first test run, try [an example](./examples), e.g.,

* Install via npm: `$ npm i @amermathsoc/texml-to-html`
* Process a test file: `$ node node_modules/@amermathsoc/texml-to-html/examples/cli.js node_modules/@amermathsoc/texml-to-html/text/article.xml > htmlOutput.html`

### Basic usage

```js
import fs from 'fs';
import path from 'path';
import xml2html from '@amermathsoc/texml-to-html';

const article = xml2html(fs.readFileSync(path.resolve(process.argv[2])).toString()).window.document;
console.log(article.toString());
```
