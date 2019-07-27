const path = require('path');
const xslt = path.resolve(__dirname, '../ams-xml-to-html.xsl');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const exec = require('child_process').exec;
const {promisify} = require('util');
const execAsync = promisify(exec);

exports.xsltproc = async input => {
  const output = await execAsync(`xsltproc ${xslt} ${input}`);
  const { window } = new JSDOM(output.stdout);
  return window.document;
};
