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

tape('Template: sec-meta => contrib-group, role, abstract/title', async function (t) {
  t.plan(10);

  const document = book;
  const section = document.querySelector('#secmeta');
  const secMeta = section.querySelector('section[data-ams-doc="sec-meta"]');
  t.equal(secMeta.getAttribute('data-ams-contributors'), '{"null":[]}', 'book sec-meta');
  t.ok(section.querySelector('h1'), 'title becomes h1');
  t.equal(section.querySelector('h1').innerHTML, '<span data-ams-doc="title">Title</span>', 'title content in heading');
  t.ok(section.querySelector('[role="doc-abstract"] h2'), 'abstract title becomes h2');

  const document2 = article;
  const secmeta = document2.querySelector('#secmeta section[data-ams-doc="sec-meta"]');
  t.ok(secmeta, 'article sec-meta creates section data attribute');
  t.equal(secmeta.getAttribute('data-ams-contributors'), '{"authors":[{"name":"GivenName Surname","bio":"","affiliations":[],"emails":[]}]}', 'article sec-meta');
  t.equal(secmeta.getAttribute('data-ams-byline'), 'GivenName Surname', 'article sec-meta');
  
  const document3 = articleAlttitle;
  const secmeta3 = document3.querySelector('#secmeta section[data-ams-doc="sec-meta"]');
  t.equal(secmeta3.getAttribute('data-ams-contributors'), '{"authors":[{"name":"Author 1","bio":"Author 1 Bio","affiliations":[],"emails":[]}],"contributors":[{"name":"Author 2","bio":"Author 2 Bio","affiliations":[],"emails":[],"byline":"with"}]}', 'article--alttitle sec-meta');
  t.equal(secmeta3.getAttribute('data-ams-byline'), 'Author 1, with Author 2', 'article sec-meta');
  
  t.ok(secmeta3.querySelector('section[data-ams-doc="notes"]'), 'sec-meta (non-contrib-group) child content');
});
