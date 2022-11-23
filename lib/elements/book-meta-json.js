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
 * 
 * @param {Node} bookMetaNode book-meta XML element node
 * @returns {String} JSON string with metadata
 */
export const generateBookJson = (recurseTheDom, passThrough, createNode, bookMetaNode) => {

    const recurseIntoSpan = xmlnode => {
        const span = createNode('span');
        recurseTheDom(span, xmlnode);
        return span;
    }

    const extractContribName = (contrib) => {
        let fullName = ''
        // NAME
        const maybeGivenNames = contrib.querySelector('name>given-names');
        const maybeSurname = contrib.querySelector('name>surname');
        const maybeSuffix = contrib.querySelector('name > suffix');
        const maybeStringname = contrib.querySelector('string-name');
        // NOTE we prefer stringname, cf. AmerMathSoc/texml#69
        if (maybeStringname) {
            fullName = maybeStringname.textContent;
        }
        else if (maybeGivenNames && maybeSurname) {
            fullName = `${maybeGivenNames.textContent}\u00A0${maybeSurname.textContent}`;
        }
        if (maybeSuffix) fullName = fullName + (maybeSuffix.textContent[0] === ',' ? '' : '\u00A0') + maybeSuffix.textContent;
        return fullName;
    }

    const extractContribAffiliation = (contrib, xref) => {
        const aff = contrib.ownerDocument.querySelector(`#${xref.getAttribute('rid')}`);
        // NOTE specific-use="current" has no use case so far
        const span = createNode('span');
        passThrough(span, aff);
        return span.innerHTML;
    }
    const extractContribAffiliations = (contrib) => {
        return [...contrib
            .querySelectorAll('xref[ref-type="aff"]')].map(extractContribAffiliation.bind(null, contrib))

    }
    const extractContrib = (bookMetaJsonContributorGroup, authorComment, contrib) => {
        const contributor = {};
        bookMetaJsonContributorGroup.push(contributor);

        contributor.name = extractContribName(contrib);


        // AFFs
        contributor.affiliations = extractContribAffiliations(contrib);
        // EMAILS

        const emailChildren = [...contrib.children].filter(node => node.tagName === 'email');
        contributor.emails = emailChildren.map(email => recurseIntoSpan(email).innerHTML);

        // author-comment
        if (authorComment) contributor.byline = authorComment;
    }



    // identifiers
    bookMetaJson.book.identifiers.AMS.publKey = bookMetaNode.querySelector('book-id[assigning-authority="AMS"][book-id-type="publisher"]')?.textContent;
    bookMetaJson.book.identifiers.AMS.volumeId = bookMetaNode.querySelector('book-id[assigning-authority="AMS"][book-id-type="volume_id"]')?.textContent;
    bookMetaJson.book.identifiers.crossref.doi = bookMetaNode.querySelector('book-id[assigning-authority="crossref"][book-id-type="doi"]')?.textContent;

    // Volume number
    bookMetaJson.book.identifiers.AMS.volumeNr = bookMetaNode.querySelector('book-volume-number')?.textContent;

    const contribGroups = bookMetaNode.querySelectorAll('contrib-group');
    contribGroups.forEach(contribGroup => {
        const groupType = contribGroup.getAttribute('content-type');
        const authorComment = contribGroup.querySelector('author-comment')?.textContent;
        bookMetaJson.contributors[groupType] = [];
        contribGroup.querySelectorAll('contrib').forEach(extractContrib.bind(null, bookMetaJson.contributors[groupType], authorComment))
    });


    bookMetaNode.querySelectorAll('publisher').forEach(publisher => {
        const publisherData = { name: publisher.querySelector('publisher-name').textContent };
        if (publisher.querySelector('publisher-loc')) publisherData.location = publisher.querySelector('publisher-loc').textContent;
        bookMetaJson.publishers.push(publisherData);
    })

    bookMetaJson.permissions.copyrightStatement = bookMetaNode.querySelector('copyright-statement')?.textContent;
    bookMetaNode.querySelectorAll('isbn').forEach(isbn => {
        bookMetaJson.book.identifiers.isbn[isbn.getAttribute('publication-format')] = isbn.textContent;
    })
    bookMetaNode.querySelectorAll('issn').forEach(issn => {
        bookMetaJson.book.identifiers.issn[issn.getAttribute('publication-format')] = issn.textContent;
    })

    // book-title-group
    const title = bookMetaNode.querySelector('book-title-group > book-title'); // NOTE title might contain math-mode (no use case yet)
    const subtitle = bookMetaNode.querySelector('book-title-group > subtitle'); // NOTE subtitle might contain math-mode (no use case yet)
    const alttitle = bookMetaNode.querySelector('book-title-group > alt-title') || title;
    bookMetaJson.book.title = recurseIntoSpan(title).innerHTML;
    if (subtitle) bookMetaJson.book.subtitle = recurseIntoSpan(subtitle).innerHTML;
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
    }

    return JSON.stringify(bookMetaJson);
};

