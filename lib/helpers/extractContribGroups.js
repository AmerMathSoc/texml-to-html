/**
 * 
 * @param {node} contrib - contrib element node
 * @returns 
 */
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

/**
 * 
 * @param {Node} articleMetaNode - a node with contrib-group descendants
 * @returns 
 */
export function extractContribGroups(articleMetaNode) {

    // TODO: move out of scope // fix `this` 
    const extractContribAffiliation = (contrib, xref) => {
        const aff = contrib.ownerDocument.querySelector(`#${xref.getAttribute('rid')}`);
        let prefix = '';
        if (aff.getAttribute('specific-use') === 'current') prefix = '<span>Address at time of publication:</span> '; //NOTE: whitespace at end is intentional.
        return prefix + this.passthroughIntoHTMLString(aff);
    }
    const extractContribAffiliations = (contrib) => {
        return [...contrib
            .querySelectorAll('xref[ref-type="aff"]')].map(extractContribAffiliation.bind(null, contrib))

    }

    const extractContrib = function (contributorsArray, contrib, index) {
        const contributor = {};

        contributor.name = extractContribName(contrib);
        contributor.bio = this.passthroughIntoHTMLString(contrib.querySelector('bio'));

        // AFFs
        contributor.affiliations = extractContribAffiliations(contrib);
        // EMAILS

        const emailChildren = contrib.querySelectorAll(':scope>email');
        // NOTE: specific-use="current" is not used downstream
        contributor.emails = emailChildren.map(email => email.textContent);

        contributor.mrauth = contrib.querySelector('contrib-id[contrib-id-type="mrauth"]')?.textContent;
        contributor.orcid = contrib.querySelector('contrib-id[contrib-id-type="orcid"]')?.textContent;

        contributor.uri = contrib.querySelector('uri')?.textContent;
        // author-comment (NOTE: child of contrib-group but it's easier if we copy it to each contributor)
        const authorComment = contrib.parentNode.querySelector('author-comment')?.textContent;
        if (index === 0 && authorComment) contributor.byline = authorComment;
        contributorsArray.push(contributor);
    }

    const extractContribGroup = function (contributors, contribGroup) {
        contributors[contribGroup.getAttribute('content-type')] ??= []; // NOTE: jams410 has 2 contrib-groups with content-type=contributors (but different author-comments); cf. #408
        contribGroup.querySelectorAll('contrib').forEach(extractContrib.bind(this, contributors[contribGroup.getAttribute('content-type')]));
    };



    let contributors = {};
    articleMetaNode.querySelectorAll('contrib-group').forEach(extractContribGroup.bind(this, contributors));
    return contributors;
}
