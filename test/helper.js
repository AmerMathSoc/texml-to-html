const fs = require('fs');
const path = require('path');
const xml2html = require('../ams-xml-to-html');

exports.article = xml2html(fs.readFileSync(path.resolve(__dirname, 'article.xml'))).window.document;
exports.articleAlttitle = xml2html(fs.readFileSync(path.resolve(__dirname, 'article--alttitle.xml'))).window.document;
exports.articleNometa = xml2html(fs.readFileSync(path.resolve(__dirname, 'article--nometa.xml'))).window.document;
exports.book = xml2html(fs.readFileSync(path.resolve(__dirname, 'book.xml'))).window.document;
