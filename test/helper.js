const path = require('path');
const xslt = path.resolve(__dirname, '../ams-xml-to-html.xsl');
const exec = require('child_process').exec;
const {promisify} = require('util');
const execAsync = promisify(exec);

exports.xsltproc = async input => {
  const output = await execAsync(`xsltproc ${xslt} ${input}`);
  return output;
};
