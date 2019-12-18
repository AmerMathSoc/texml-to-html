const fs = require('fs');
const path = require('path');
const xslt = path.resolve(__dirname, '../ams-xml-to-html.xsl');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const exec = require('child_process').exec;
const {promisify} = require('util');
const execAsync = promisify(exec);
const prettier = require("prettier");

const xml2html = require('../lib/main.js');

exports.xsltproc = async input => {
  const output = await execAsync(`xsltproc ${xslt} ${input}`);
  const dom = new JSDOM(output.stdout);
  // console.log(prettier.format( dom.serialize(), { parser: "html" }));
  return dom.window.document;
};

exports.xsltproc = async input => {
  const inputString = fs.readFileSync(input);
  const dom = xml2html(inputString);
  // console.log(prettier.format( dom.serialize(), { parser: "html" }));
  return dom.window.document;
};
