#!/usr/bin/env node
const { exec } = require('child_process');
const { spawn } = require('child_process');
const input = process.argv[2];
const output = process.argv[3];
spawn(`xsltproc --output ${output} htmlbook.xsl ${input}`, {
    stdio: 'inherit',
    shell: true,
    cwd: '.'
  });
