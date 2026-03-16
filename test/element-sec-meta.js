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

import { article, articleAlttitle, book } from './helper.js';
import tape from 'tape';

tape('Template: sec-meta', async function (t) {
  t.plan(16);

  const document = book;
  const section = document.querySelector('#secmeta');
  const secMeta = section.querySelector('div[data-ams-doc="sec-meta"]');
  t.equal(secMeta.getAttribute('data-ams-contributors'), '{"null":[]}', 'book sec-meta');
  t.ok(section.querySelector('h2'), 'title becomes h2');
  t.equal(section.querySelector('h2').innerHTML, '<span data-ams-doc="title">Title</span>', 'title content in heading');
  t.ok(section.querySelector('[role="doc-abstract"] h2'), 'abstract title becomes h2');

  // book-part-meta
  const bookPartMeta = document.querySelector('#bookPartMeta>div[data-ams-doc="sec-meta"]');
  t.equal(bookPartMeta.getAttribute('data-ams-byline'), 'A. Author', 'book-part-meta: byline');
  console.log()
  t.equal(bookPartMeta.getAttribute('data-ams-contributors'), '{"authors":[{"name":"A. Author","bio":"","affiliations":["Author University"],"emails":["author@example.com"],"mrauth":"0000","orcid":"0000"}]}', 'book-part-meta: contrib-group');
  t.ok(bookPartMeta.firstElementChild.tagName, 'h1', 'book-part-meta: title-group');
  t.ok(bookPartMeta.querySelector('[role="doc-abstract"]'), 'book-part-meta: abstract');
  t.ok(bookPartMeta.querySelector('ul[data-ams-doc="MSC 2020"]'), 'book-part-meta: MSCs');
  t.ok(bookPartMeta.querySelector('div[data-ams-doc="funding-group"]'), 'book-part-meta: funding-group');

  const document2 = article;
  const secmeta = document2.querySelector('#secmeta div[data-ams-doc="sec-meta"]');
  t.ok(secmeta, 'article sec-meta creates section data attribute');
  t.equal(secmeta.getAttribute('data-ams-contributors'), '{"authors":[{"name":"GivenName Surname","bio":"","affiliations":[],"emails":[]}]}', 'article sec-meta');
  t.equal(secmeta.getAttribute('data-ams-byline'), 'GivenName Surname', 'article sec-meta');

  const document3 = articleAlttitle;
  const secmeta3 = document3.querySelector('#secmeta div[data-ams-doc="sec-meta"]');
  t.equal(secmeta3.getAttribute('data-ams-contributors'), '{"authors":[{"name":"Author 1","bio":"Author 1 Bio","affiliations":[],"emails":[]}],"contributors":[{"name":"Author 2","bio":"Author 2 Bio","affiliations":[],"emails":[],"byline":"with"}]}', 'article--alttitle sec-meta');
  t.equal(secmeta3.getAttribute('data-ams-byline'), 'Author 1, with Author 2', 'article sec-meta');

  t.ok(secmeta3.querySelector('section[data-ams-doc="notes"]'), 'sec-meta (non-contrib-group) child content');
});
