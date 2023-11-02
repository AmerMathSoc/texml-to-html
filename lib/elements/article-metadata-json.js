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

import { generateByline } from "../helpers/generateByline.js";

/**
 * NOTE: `this` bound via call
 * @param {Node} articleMetaNode XML element node <front>
 * @returns {String} serialized JSON containing metadata
 */
export function generateArticleJson(articleMetaNode) {
    const articleMetaJson = // NOTE: in the closure to avoid tests interfering with each other
    {
        title: '',
        alttitle: '',
        identifiers: {
            AMS: {},
            crossref: {},
            uri: {},
        },
        relatedArticles: {
            // errata etc
        },
        publishers:
            [
                // { name: '', location: '' },
            ],
        contributors: {
        },
        permissions: {
            copyrightStatement: '',

        },
        journal: {
            title: '',
            identifiers: {
                AMS: {
                    journalId: '',
                },
                issn: {
                    print: '', // NOTE not all journals have print (e.g., bproc, btran, cams)
                    electronic: '',
                },
                uri: '',
            }
        },
        customMeta: {}, // e.g., comm-by, NOTI titlepic
        categories: {} // subj-group and NOTI custom-meta category
    }

    // contributors
    articleMetaJson.contributors = this.extractContribGroups(articleMetaNode);
    articleMetaJson.byline = generateByline(articleMetaJson.contributors);

    // journal metadata

    articleMetaJson.journal.title = articleMetaNode.querySelector('journal-meta>journal-title-group>journal-title')?.textContent;
    articleMetaJson.journal.identifiers.AMS.journalId = articleMetaNode.querySelector('journal-meta>journal-id[journal-id-type="publisher"]')?.textContent;

    articleMetaNode.querySelectorAll('journal-meta>issn').forEach(node => {
        const format = node.getAttribute('publication-format');
        articleMetaJson.journal.identifiers.issn[format] = node.textContent;
    })

    articleMetaJson.journal.identifiers.uri = articleMetaNode.querySelector('journal-meta>self-uri')?.textContent;


    // article identifiers
    // internal
    articleMetaJson.identifiers.AMS.manuscriptId = articleMetaNode.querySelector('article-id[pub-id-type="manuscript"]')?.textContent;
    articleMetaJson.identifiers.AMS.mr = articleMetaNode.querySelector('article-id[pub-id-type="mr"]')?.textContent;
    articleMetaJson.identifiers.AMS.pii = articleMetaNode.querySelector('article-id[pub-id-type="pii"]')?.textContent;
    // DOI
    articleMetaJson.identifiers.crossref.doi = articleMetaNode.querySelector('article-id[pub-id-type="doi"]')?.textContent;
    // URIs
    articleMetaJson.identifiers.uri.abstract = articleMetaNode.querySelector('article-meta>self-uri[content-type="abstract"]')?.getAttribute('xlink:href');
    // basename
    articleMetaJson.identifiers.basename = articleMetaJson.journal.identifiers.AMS.journalId + articleMetaJson.identifiers.AMS.manuscriptId;

    articleMetaJson.identifiers.uri.pdf = articleMetaNode.querySelector('article-meta>self-uri[content-type="pdf"]')?.getAttribute('xlink:href');
    // amsref citation
    articleMetaJson.identifiers.amsref = articleMetaNode.querySelector('article-citation')?.textContent.trim();

    // related articles
    articleMetaNode.querySelectorAll('related-article').forEach(relatedArticle => {
        const pii = relatedArticle.querySelector('pub-id[pub-id-type="pii"]').textContent;
        const link = relatedArticle.querySelector('ext-link');
        articleMetaJson.relatedArticles[pii] = {
            type: relatedArticle.getAttribute('related-article-type'),
            url: link.getAttribute('ext-link'),
            linkText: link.textContent,
        };
    });

    articleMetaNode.querySelectorAll('publisher').forEach(publisher => {
        const publisherData = { name: publisher.querySelector('publisher-name').textContent };
        if (publisher.querySelector('publisher-loc')) publisherData.location = publisher.querySelector('publisher-loc').textContent;
        articleMetaJson.publishers.push(publisherData);
    })

    articleMetaJson.permissions.copyrightStatement = articleMetaNode.querySelector('copyright-statement')?.textContent; // NOTE: these have been plain text so far

    // custom-meta (e.g., comm-by, NOTI titlepic) 

    articleMetaNode.querySelectorAll('custom-meta-group > custom-meta').forEach(node => {
        const specificUse = node.getAttribute('specific-use');
        if (specificUse === 'notices-category') return;
        articleMetaJson.customMeta[specificUse] = this.passthroughIntoHTMLString(node.querySelector('meta-value'));
    })

    // article-title-group
    const title = articleMetaNode.querySelector('title-group > article-title'); // NOTE: title can contain tex-math; also as H1 in HTML
    articleMetaJson.title = this.passthroughIntoHTMLString(title);
    const alttitle = articleMetaNode.querySelector('title-group > alt-title') || title;
    if (alttitle) articleMetaJson.alttitle = alttitle.textContent;
    articleMetaJson.subtitle = articleMetaNode.querySelector('title-group > subtitle')?.textContent;// NOTE: subtitle occurs in NOTI only (so far); might contain tex-math (but no use case so far)

    // journal volume info
    articleMetaJson.volumeInfo = {
        volume: articleMetaNode.querySelector('volume')?.textContent,
        issue: articleMetaNode.querySelector('issue')?.textContent,
        pageFirst: articleMetaNode.querySelector('fpage')?.textContent,
        pageLast: articleMetaNode.querySelector('lpage')?.textContent,
        pageRange: articleMetaNode.querySelector('page-range')?.textContent,
    }

    // categories
    articleMetaJson.categories = {
        category: articleMetaNode.querySelector('subject')?.textContent, // NOTE: only one article-category>subj-group>subject element per article so far
        'notices-category': articleMetaNode.querySelector('custom-meta[specific-use="notices-category"] meta-value')?.textContent, // NOTE: cf. custom-meta handling
    }

    // history (including pub-date)
    // TODO: NOTI articles have no pub-date and only an issue date (without iso-8601-date attributes)
    articleMetaJson.history = {
        published: articleMetaNode.querySelector('pub-date')?.getAttribute('iso-8601-date'),
        received: articleMetaNode.querySelector('date[date-type="received"]')?.getAttribute('iso-8601-date'),
        'rev-recd': articleMetaNode.querySelectorAll('date[date-type="rev-recd"]').map(node => node.getAttribute('iso-8601-date')),
        issue: articleMetaNode.querySelector('date[date-type="issue-date"]')?.getAttribute('iso-8601-date'),
    };

    // kwd-groups
    const mscNode = articleMetaNode.querySelector('kwd-group[vocab]');
    if (mscNode) articleMetaJson.msc = {
        vocab: mscNode.getAttribute('vocab'),
        vocabUrl: `${mscNode.getAttribute('vocab-identifier')}?t=`,
        primary: mscNode.querySelectorAll('compound-kwd[content-type="primary"]').map(node => node.firstElementChild.textContent),
        secondary: mscNode.querySelectorAll('compound-kwd[content-type="secondary"]').map(node => node.firstElementChild.textContent),
    }
    articleMetaJson.keywords = articleMetaNode.querySelectorAll('kwd-group[kwd-group-type="author"] kwd').map(node => node.textContent);

    return JSON.stringify(articleMetaJson, null, 4);
};

