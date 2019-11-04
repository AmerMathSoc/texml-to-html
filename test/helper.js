const fs = require('fs');
const path = require('path');
const xslt = path.resolve(__dirname, '../ams-xml-to-html.xsl');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const exec = require('child_process').exec;
const {promisify} = require('util');
const execAsync = promisify(exec);

const xml2html = require('../main.js');

exports.xsltproc = async input => {
  const output = await execAsync(`xsltproc ${xslt} ${input}`);
  const { window } = new JSDOM(output.stdout);
  return window.document;
};

exports.xsltproc = async input => {
  const inputString = fs.readFileSync(input);
  const dom = xml2html(inputString);
  console.log(dom.serialize());
  return dom.window.document;
};
