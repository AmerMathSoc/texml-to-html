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

const bookMetaJson =
{
    book: {
        identifiers: {
            AMS: { // book-id
                publKey: '',
                volumeId: '',
                volumeNr: '', // book-volume-number
            },
            crossref: { // book-id
                doi: ''
            },
            issn: {
                // print: '',
            },
            isbn: {
                // electronic: '',
                // google: '',
                // print: '',
                // softcover: '',
            },
            loc: {
                // llcn
            }
        },
        title: '', // NOTE might contain math (but no use case yet)
        // alttitle: '', // NOTE once we have math mode, we should have alttitle
        // subtitle: '',
        // history: '', // html output drops history, too
    },
    publishers:
        [
            // {
            //     name: '',
            //     location: ''
            // },
        ]
    ,
    contributors: {
        // contributor groups (editors, translators, illustrators)
        // NOTE should have at least have 1 author or 1 editor
        // e.g.
        // authors: [
        //     {
        //         // name: '',
        //         // affiliations: [],
        //         // email: [],
        //         // homepage: [],

        //     }
        // ],
        // ...
    },
    permissions: {
        // NOTE we only use the statement downstream
        // copyrightYear: '',
        // copyrightHolder: ''
        copyrightStatement: '',

    },
    // collection: {
    //     title: '',
    //     subseries: '',
    // },
}
/**
 * NOTE: `this` bound via call
 * @param {Node} bookMetaNode book-meta XML element node
 * @returns {String} JSON string with metadata
 */
export function generateBookJson(bookMetaNode) {

    // identifiers
    bookMetaJson.book.identifiers.AMS.publKey = bookMetaNode.querySelector('book-id[assigning-authority="AMS"][book-id-type="publisher"]')?.textContent;
    bookMetaJson.book.identifiers.AMS.volumeId = bookMetaNode.querySelector('book-id[assigning-authority="AMS"][book-id-type="volume_id"]')?.textContent;
    bookMetaJson.book.identifiers.crossref.doi = bookMetaNode.querySelector('book-id[assigning-authority="crossref"][book-id-type="doi"]')?.textContent;
    bookMetaJson.book.identifiers.loc.lccn = bookMetaNode.querySelector('book-id[assigning-authority="Library of Congress"][book-id-type="lccn"]')?.textContent;

    // Volume number
    bookMetaJson.book.identifiers.AMS.volumeNr = bookMetaNode.querySelector('book-volume-number')?.textContent;

    // Issue number (e.g. MEMO)
    bookMetaJson.book.identifiers.AMS.issueNr = bookMetaNode.querySelector('book-issue-number')?.textContent;

    // history (including pub-date)
    // Most books have only `pub-date` but some have history (e.g. MEMO)
    bookMetaJson.history = {
        published: bookMetaNode.querySelector('pub-date')?.getAttribute('iso-8601-date'),
        received: bookMetaNode.querySelector('history date[date-type="received"]')?.getAttribute('iso-8601-date'),
        issue: bookMetaNode.querySelector('history date[date-type="issue-date"]')?.getAttribute('iso-8601-date'),
    };
    if (bookMetaNode.querySelector('history')) {
        bookMetaJson.history['rev-recd'] = bookMetaNode.querySelectorAll('history date[date-type="rev-recd"]').map(node => node.getAttribute('iso-8601-date'))
    }

    // basename
    bookMetaJson.book.identifiers.basename = bookMetaJson.book.identifiers.AMS.publKey + (bookMetaJson.book.identifiers.AMS.issueNr || bookMetaJson.book.identifiers.AMS.volumeNr);

    bookMetaJson.contributors = this.extractContribGroups(bookMetaNode);

    bookMetaJson.publishers = [...bookMetaNode.querySelectorAll('publisher')].map(publisher => {
        const publisherData = { name: publisher.querySelector('publisher-name').textContent };
        if (publisher.querySelector('publisher-loc')) publisherData.location = publisher.querySelector('publisher-loc').textContent;
        return publisherData;
    })

    bookMetaJson.permissions.copyrightStatement = bookMetaNode.querySelector('copyright-statement')?.textContent;
    bookMetaNode.querySelectorAll('isbn').forEach(isbn => {
        bookMetaJson.book.identifiers.isbn[isbn.getAttribute('publication-format')] = isbn.textContent;
    })
    bookMetaNode.querySelectorAll('issn').forEach(issn => {
        bookMetaJson.book.identifiers.issn[issn.getAttribute('publication-format')] = issn.textContent;
    })

    // book-title-group
    const title = bookMetaNode.querySelector('book-title-group > book-title'); // NOTE title might contain complex markup (no use case yet; however e.g. surv279 has math-as-unicode). See also head.js
    const subtitle = bookMetaNode.querySelector('book-title-group > subtitle'); // NOTE subtitle might contain math-mode (no use case yet)
    const alttitle = bookMetaNode.querySelector('book-title-group > alt-title') || title;
    bookMetaJson.book.title = this.passthroughIntoHTMLString(title);
    if (subtitle) bookMetaJson.book.subtitle = this.passthroughIntoHTMLString(subtitle);
    if (alttitle) bookMetaJson.book.alttitle = alttitle.textContent;

    // collection-meta
    const collectionMeta = bookMetaNode.ownerDocument.querySelector('collection-meta');
    if (collectionMeta) {
        bookMetaJson.collection = {};
        bookMetaJson.collection.title = collectionMeta.querySelector('title-group > title').textContent;
        collectionMeta.querySelectorAll('custom-meta').forEach(customMeta => {
            // NOTE custom-meta should have exactly two children - meta-name and meta-value
            bookMetaJson.collection[customMeta.querySelector('meta-name').textContent] = customMeta.querySelector('meta-value').textContent;
        });
        bookMetaJson.collection.contributors = this.extractContribGroups(collectionMeta);
    }

    // Issue data (e.g., MEMO)
    if (bookMetaJson.book.identifiers.AMS.issueNr) {
        bookMetaJson.issue = {
            number: bookMetaJson.book.identifiers.AMS.issueNr,
            note: bookMetaNode.querySelector('book-issue-note')?.textContent,
            date: bookMetaNode.querySelector('history date[date-type="issue-date"]')?.getAttribute('iso-8601-date'),
        }
    }

    return JSON.stringify(bookMetaJson);
};

