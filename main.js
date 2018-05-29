#!/usr/bin/env node
const { exec } = require('child_process');
const { spawn } = require('child_process');
const path = require('path');
const callPath = process.argv[2];
const input = path.resolve(callPath, process.argv[3]);
const output = path.resolve(callPath, process.argv[4]);
spawn(`xsltproc --output ${output} htmlbook.xsl ${input}`, {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
  });
