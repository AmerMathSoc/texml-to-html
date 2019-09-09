<?xml version="1.0" encoding="UTF-8"?>

<!-- Input: texml output (based on JATS, BITS) -->

<!-- Output: html (based on https://github.com/oreillymedia/HTMLBook) -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:amermathsoc="amermathsoc" exclude-result-prefixes="xlink amermathsoc">

<xsl:strip-space elements="description inline-formula"/>
<xsl:output method="html"
            encoding ="utf-8"/>
            <xsl:preserve-space
              elements="abbrev abbrev-journal-title abstract access-date addr-line
                        aff alt-text alt-title article-id article-title
                        attrib award-id bold chapter-title chem-struct
                        collab comment compound-kwd-part compound-subject-part
                        conf-acronym conf-date conf-loc conf-name conf-num
                        conf-sponsor conf-theme contrib-id copyright-holder
                        copyright-statement copyright-year corresp country
                        date-in-citation day def-head degrees disp-formula
                        edition elocation-id email etal ext-link fax fpage
                        funding-source funding-statement given-names glyph-data
                        gov inline-supplementary-material
                        institution isbn issn-l issn issue issue-id issue-part
                        issue-sponsor issue-title italic journal-id
                        journal-subtitle journal-title kwd label license-p
                        long-desc lpage meta-name meta-value mixed-citation
                        monospace month named-content object-id on-behalf-of
                        overline p page-range part-title patent person-group
                        phone prefix preformat price principal-award-recipient
                        principal-investigator product pub-id publisher-loc
                        publisher-name related-article related-object role
                        roman sans-serif sc season self-uri series series-text
                        series-title sig sig-block size source speaker std
                        strike string-name styled-content std-organization
                        sub subject subtitle suffix sup supplement surname
                        target td term term-head tex-math textual-form th
                        time-stamp title trans-source trans-subtitle trans-title
                        underline uri verse-line volume volume-id volume-series
                        xref year
                        title head
                        math annotation ci cn csymbol mi mn
                        mo ms mtext book-meta"/>

<xsl:template match="/">
  <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
  <xsl:text>&#xa;</xsl:text>
  <xsl:text disable-output-escaping="yes">&lt;html lang="en"&gt;</xsl:text>
  <xsl:apply-templates/>
</xsl:template>

<!-- BOOKS -->

<xsl:template match="book">
<head>
  <meta name="viewport" content="width=device-width"/>
    <title>
        <xsl:value-of select="book-meta/book-title-group/book-title/text()"/>
        </title>
        <xsl:text>&#xa;</xsl:text>
</head>
<body>
    <xsl:apply-templates/>
</body>
  <xsl:text disable-output-escaping="yes">&lt;/html&gt;</xsl:text>
</xsl:template>

<!-- the "pass-through" template -->
<xsl:template match="front-matter|book-body|book-back|book-part|named-book-part-body|book-part-meta|book-part/body">
    <xsl:apply-templates/>
</xsl:template>

<!-- alternative for label pass-through -->
<xsl:template match="label" mode="generic">
    <xsl:apply-templates select="node()"/>
</xsl:template>


<xsl:template match="preface">
    <section role="doc-preface">
        <xsl:apply-templates select="@*|node()"/>
    </section>
</xsl:template>

<xsl:template match="book-meta">
    <section data-ams-doc="titlepage">
        <xsl:apply-templates select="book-title-group"/>
        <span data-ams-doc="series">
          <xsl:value-of select="book-id[@book-id-type = 'publ_key']/text()"/>
        </span>
        <dl>
        <xsl:apply-templates select="contrib-group"/>
        </dl>
        <footer>
        <dl>
            <dt>Published by</dt>
            <xsl:apply-templates select="publisher"/>
        </dl>
        <xsl:apply-templates select="permissions/copyright-statement"/>
      </footer>
    </section>
</xsl:template>


<xsl:template match="book-meta/permissions/copyright-statement">
<p data-ams-doc="book copyright">
  <xsl:apply-templates/>
</p>
</xsl:template>

<xsl:template match="book-title-group">
    <header><xsl:apply-templates/></header>
</xsl:template>

<xsl:template match="book-title">
    <h1><xsl:apply-templates select="@*|node()"/></h1>
</xsl:template>

<xsl:template match="book-title-group/subtitle">
    <p data-ams-doc="subtitle"><xsl:apply-templates select="@*|node()"/></p>
</xsl:template>
<!-- Passthrough template variant to allow pulling subtitle into <title>/<label> logic-->
<xsl:template match="subtitle" mode="generic">
    <xsl:apply-templates select="@*|node()"/>
</xsl:template>

<xsl:template match="book-meta/publisher">
    <dd data-ams-doc="book publisher"><xsl:apply-templates select="@*|node()"/></dd>
</xsl:template>

<xsl:template match="book-meta/publisher/publisher-name">
    <span><xsl:apply-templates select="@*|node()"/></span><xsl:if test="following-sibling::*">,</xsl:if>
</xsl:template>
<xsl:template match="book-meta/publisher/publisher-loc">
    <span><xsl:apply-templates select="@*|node()"/></span>
</xsl:template>

<xsl:template match="book-back//ref-list">
    <section data-ams-doc-level="1" role="doc-bibliography" id="{@id}">
        <xsl:apply-templates select="title"/>
        <dl>
            <xsl:apply-templates select="ref"/>
        </dl>
    </section>
</xsl:template>

<!-- ARTICLES -->

<xsl:template match="article">
<head>
    <title>
     <xsl:choose>
      <xsl:when test="front/article-meta/title-group/alt-title"><xsl:value-of select="front/article-meta/title-group/alt-title"/></xsl:when>
      <xsl:otherwise><xsl:value-of select="front/article-meta/title-group/article-title"/></xsl:otherwise>
     </xsl:choose>
    </title>
</head>
<body>
    <xsl:text>&#xa;</xsl:text>
    <section data-ams-doc="titlepage">
    <xsl:text>&#xa;</xsl:text>
    <header>
        <xsl:text>&#xa;</xsl:text>
        <aside data-ams-doc="journal"><!-- TODO cf. front/journal-meta: should this duplication be done in ams-html? -->
        <xsl:text>&#xa;</xsl:text>
        <p data-ams-doc="journal title"><xsl:value-of select="front/journal-meta/journal-title-group/journal-title/text()"/></p>
        <p data-ams-doc="journal location"><span data-ams-doc="journal volume">Volume <xsl:value-of select="front/article-meta/volume/text()"/>, </span><span data-ams-doc="journal issue">Issue <xsl:value-of select="front/article-meta/issue/text()"/></span><span data-ams-doc="journal date">(<xsl:value-of select="front/article-meta/pub-date/@iso-8601-date"/>)</span></p>
        <p data-ams-doc="journal pii"><a href="https://doi.org/{front/article-meta/article-id[@pub-id-type = 'doi']/text()}"><xsl:value-of select="front/article-meta/article-id[@pub-id-type = 'pii']/text()"/></a></p>
        <xsl:text>&#xa;</xsl:text>
        </aside>
        <xsl:text>&#xa;</xsl:text>
        <h1>
        <xsl:apply-templates select="front/article-meta/title-group/article-title"/>
        </h1>
        <xsl:text>&#xa;</xsl:text>
        <xsl:apply-templates select="front/notes[@notes-type='dedication']"/>
        <xsl:text>&#xa;</xsl:text>
    </header>
    <xsl:text>&#xa;</xsl:text>
    <xsl:apply-templates select="front/article-meta/abstract"/>
    </section>
    <xsl:text>&#xa;</xsl:text>

    <xsl:apply-templates select="front/article-meta"/>

    <xsl:text>&#xa;</xsl:text>
    <section data-ams-doc="article">
    <xsl:text>&#xa;</xsl:text>
    <h1>
        <xsl:apply-templates select="front/article-meta/title-group/article-title"/>
    </h1>
    <xsl:text>&#xa;</xsl:text>
    <xsl:apply-templates/>
    </section>
<xsl:text>&#xa;</xsl:text>
</body>
<xsl:text>&#xa;</xsl:text>
<xsl:text disable-output-escaping="yes">&lt;/html&gt;</xsl:text>
</xsl:template>

<xsl:template match="article/body">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="article-meta">
  <section data-ams-doc="copyright-page">
    <xsl:text>&#xa;</xsl:text>
    <h2>Article Information</h2>
    <dl>
      <xsl:apply-templates select="ams-meta-group"/>
      <xsl:if test="kwd-group">
      <dt>Keywords</dt>
      <dd> <!-- NOTE cf. #220, schema.org -->
        <xsl:apply-templates select="kwd-group"/>
      </dd>
      </xsl:if>
      <xsl:apply-templates select="contrib-group"/>
      <xsl:apply-templates select="funding-group"/>
      <!-- HACK until texml makes them identifiable them https://github.com/AmerMathSoc/ams-article-sources/issues/5 -->
      <xsl:if test="custom-meta-group/custom-meta[@specific-use='communicated-by']">
        <dt><xsl:apply-templates select="custom-meta-group/custom-meta[@specific-use='communicated-by']/meta-name/text()"/></dt>
        <dd>
          <xsl:apply-templates select="custom-meta-group/custom-meta[@specific-use='communicated-by']/meta-value/text()"/>
        </dd>
      </xsl:if>
      <dt>Journal Information</dt>
      <dd>
        <xsl:apply-templates select="../journal-meta"/>
      </dd>
      <dt>Publication History</dt>
      <dd>
        <xsl:apply-templates select="pub-date"/>
      </dd>
      <xsl:apply-templates select="permissions/copyright-statement"/>
      <dt>Article References</dt>
      <dd>
        <ul>
        <xsl:apply-templates select="self-uri"/>
        <xsl:apply-templates select="article-id"/>
        <xsl:apply-templates select="article-citation"/>
      </ul>
      </dd>
    </dl>
    <xsl:text>&#xa;</xsl:text>
  </section>
</xsl:template>

<xsl:template match="article-meta/title-group">
  <header>
    <xsl:text>&#xa;</xsl:text>
    <h2>
      <xsl:apply-templates/>
    </h2>
    <xsl:text>&#xa;</xsl:text>
    <p>
      <xsl:apply-templates select="front/article-meta/contrib[@contrib-type='author']"/>
    </p>
    <xsl:text>&#xa;</xsl:text>
  </header>
  <xsl:text>&#xa;</xsl:text>
</xsl:template>

<xsl:template match="article-meta/title-group/article-title">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="front/notes[@notes-type='dedication']">
  <div role="doc-dedication">
    <xsl:apply-templates/>
  </div>
</xsl:template>

<!-- NOTE: article template partially duplicates this information for titlepage, cf. note there. -->
<xsl:template match="front/journal-meta">
      <a href="{self-uri/@xlink:href}"><xsl:value-of select="journal-title-group/journal-title"/></a>, <span >Volume <xsl:value-of select="../article-meta/volume"/></span>, <span>Issue <xsl:value-of select="../article-meta/issue"/></span>, ISSN <span><xsl:value-of select="journal-title-group/issn"/></span>, published by the
      <span><xsl:value-of select="publisher/publisher-name"/></span>, <span><xsl:value-of select="publisher/publisher-loc"/></span>.
</xsl:template>


<xsl:template match="contrib-group">
<!-- Expected values for contrib-group/@content-type:  "authors", "editors", "translators", "contributors". -->
<!-- We capitalize the first letter of @content-type and remove the final letter (which should be 's'). -->
      <dt><xsl:value-of select="concat(
  translate(
    substring(@content-type, 1, 1),
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  ),
  substring(@content-type,2,string-length(@content-type)-2)
)"/> Information</dt>
      <dd data-ams-doc-contrib="{@content-type}">
      <!-- NOTE author-comment needs to fit in a sentence -->
          <xsl:if test="author-comment"><xsl:attribute name="data-ams-doc-contrib-comment"><xsl:value-of select="author-comment/text()"/></xsl:attribute></xsl:if>
        <xsl:apply-templates/>
      </dd>
</xsl:template>

<xsl:template match="book//sec-meta//contrib-group"><p><xsl:apply-templates/></p></xsl:template>
<xsl:template match="book//sec-meta//contrib-group/author-comment"><span><xsl:apply-templates/></span></xsl:template>

<!-- NOTE same as statement/title -->
<xsl:template match="book//sec-meta/abstract/title">
  <xsl:variable name="displevel" select="ancestor::*[@disp-level][1]/@disp-level"/>
     <xsl:variable name="level">
     <xsl:choose>
      <xsl:when test="/article"><xsl:value-of select="$displevel + 2"/></xsl:when>
      <xsl:otherwise><xsl:value-of select="$displevel + 1"/></xsl:otherwise>
     </xsl:choose>
    </xsl:variable>

     <xsl:text disable-output-escaping="yes">&lt;h</xsl:text><xsl:value-of select="$level" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>         <xsl:if test="preceding-sibling::label[1][text()] != ''">
             <xsl:apply-templates select="preceding-sibling::label[1]" mode="generic"/>
             <xsl:text> </xsl:text>
         </xsl:if>
         <xsl:apply-templates select="@*|node()"/>
        <xsl:if test="not(starts-with(../@content-type, 'proof'))">
          <xsl:text>. </xsl:text>
        </xsl:if>
      <xsl:text disable-output-escaping="yes">&lt;/h</xsl:text><xsl:value-of select="$level " /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
</xsl:template>

<xsl:template match="contrib-group/contrib">
  <dl data-ams-doc-contrib="{@contrib-type}">
    <dt data-ams-doc-contrib="{@contrib-type} name">
      <xsl:value-of select="name/given-names"/>&#160;<xsl:value-of select="name/surname"/>
    </dt>
    <xsl:if test="not (xref[@ref-type='aff'])"><dd></dd></xsl:if>
    <xsl:apply-templates select="xref[@ref-type='aff']"/>
    <xsl:if test="email">
    <dd>
      <xsl:apply-templates select="email"/>
    </dd>
    </xsl:if>
    <xsl:if test="uri">
      <dd><a href="{uri/text()}">Homepage</a></dd>
    </xsl:if>
    <xsl:if test="contrib-id[@contrib-id-type='mrauth']">
    <dd>
      <a href="{contrib-id[@contrib-id-type='mrauth']/text()}">MathSciNet</a>
    </dd>
  </xsl:if>
  <xsl:if test="contrib-id[@contrib-id-type='orcid']">
  <dd>
    <a href="{contrib-id[@contrib-id-type='orcid']/text()}">ORCID</a>
  </dd>
</xsl:if>
  </dl>
</xsl:template>

<xsl:template match="email">
  <a href="mailto://{email/text()}">
    <xsl:apply-templates/>
  </a>
  <xsl:if test="position() != last()">
    <xsl:text>, </xsl:text>
  </xsl:if>
</xsl:template>

<xsl:template match="article-meta/pub-date">
    This article was received on <time datetime="{../history/date[@date-type='received']/@iso-8601-date}"><xsl:value-of select="../history/date[@date-type='received']/@iso-8601-date"/></time><xsl:if test="../history/date[@date-type='rev-recd']"><xsl:text>,&#xA0;</xsl:text>revised on <xsl:apply-templates select="../history/date[@date-type='rev-recd']"/>
    </xsl:if>
    and published on <time datetime="{@iso-8601-date}"><xsl:value-of select="@iso-8601-date"/></time>.
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="article-meta/history/date[@date-type='rev-recd']"><time datetime="{@iso-8601-date}"><xsl:value-of select="@iso-8601-date"/></time>,
</xsl:template>


<xsl:template match="ams-meta-group">
  <dt>MSC <xsl:value-of select="msc/@scheme"/></dt>
  <xsl:apply-templates/>
</xsl:template>

<xsl:template match="ams-meta-group/msc">
  <xsl:if test="primary">
    <dd>Primary:
    <xsl:for-each select="primary">
    <a href="http://www.ams.org/msc/msc2010.html?t={key/text()}"><xsl:value-of select="key/text()"/> (<xsl:apply-templates select="description"/>)</a>
    <xsl:choose>
      <xsl:when test="position() != last()">, </xsl:when>
    </xsl:choose>
    </xsl:for-each>
    </dd>
  </xsl:if>
  <xsl:if test="secondary">
    <dd>Secondary:
    <xsl:for-each select="secondary">
    <a href="http://www.ams.org/msc/msc2010.html?t={key/text()}"><xsl:value-of select="key/text()"/> (<xsl:apply-templates select="description"/>)</a>
    <xsl:choose>
      <xsl:when test="position() != last()">, </xsl:when>
    </xsl:choose>
    </xsl:for-each>
    </dd>
  </xsl:if>
</xsl:template>

<xsl:template match="article-meta/permissions/copyright-statement">
  <dt>Copyright Information</dt>
  <dd data-ams-doc="copyright"><xsl:apply-templates/></dd>
</xsl:template>

<xsl:template match="article-meta/self-uri">
  <li>
  <a href="{@xlink:href}" data-ams-ref="{@content-type}">
    Permalink
    <xsl:if test="@content-type='pdf'">
        (PDF)
    </xsl:if>
  </a>
  </li>
</xsl:template>

<xsl:template match="article-meta/kwd-group">
    <ul>
      <xsl:apply-templates/>
    </ul>
</xsl:template>

<xsl:template match="article-meta/funding-group">
  <dt>Additional Notes</dt>
  <dd><xsl:apply-templates/></dd>
</xsl:template>

<xsl:template match="article-meta/funding-group/funding-statement">
    <p><xsl:apply-templates/></p>
</xsl:template>

<xsl:template match="article-meta/article-citation">
  <li>
    <code data-ams-doc="amsref">
      <xsl:value-of select="text()"/>
    </code>
  </li>
</xsl:template>


<xsl:template match="contrib-group/contrib/xref[@ref-type='aff']">
  <dd>
  <xsl:variable name="link" select="./@rid" />
  <xsl:if test="../../aff[@id = $link]/@specific-use = 'current'">
      <span>Address at time of publication: </span>
  </xsl:if>
  <xsl:apply-templates select="../../aff[@id = $link]" mode="generic"/>
  </dd>
</xsl:template>
<xsl:template match="aff" mode="generic">
    <xsl:apply-templates select="node()"/>
</xsl:template>

<!-- the "ignore" template -->
<xsl:template match="name | surname | given-names | aff | contrib-id | pub-date/* | history | volume | issue | copyright-year | x | article-categories | raw-citation | alt-text | author-comment | sec-meta | table-wrap/caption | table-wrap/label | fig/attrib | subtitle | def-list/@style | def-list/@type | def-item/@value | tex-math/fn | disp-formula/alternatives/textual-form | inline-formula/alternatives/textual-form | math | fn/label">
</xsl:template>

<xsl:template match="article-meta/kwd-group/kwd">
  <li><xsl:apply-templates/></li>
</xsl:template>

<xsl:template match="article-meta/article-id">
    <xsl:if test="@pub-id-type = 'doi'">
      <li>
        DOI <a href="https://doi.org/{text()}"><xsl:value-of select="text()"/></a>
      </li>
    </xsl:if>
    <xsl:if test="@pub-id-type = 'mr'">
      <li>
        <a href="http://www.ams.org/mathscinet-getitem?mr={text()}">MathSciNet Review</a>
      </li>
    </xsl:if>
</xsl:template>


<xsl:template match="front"/>

<!-- SHARED -->

<xsl:template match="metainfo"/>

<!-- the "pass-through" template -->
<xsl:template match="permissions| article-meta/custom-meta-group | ams-meta-group//description  | statement/secheading | table-wrap | toc-entry/title/xref | back | alternatives | tex-math | title-group">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="styled-content">
<!-- NOTE: we also use data-ams-style for @style. This might clash if we introduce styled-content with style attributes -->
    <span data-ams-style="{@style-type}">
        <xsl:apply-templates/>
    </span>
</xsl:template>


<xsl:template match="italic">
<xsl:choose>
    <xsl:when test="@toggle='yes'">
        <em><xsl:apply-templates select="@*|node()"/></em>
    </xsl:when>
    <xsl:otherwise>
        <i><xsl:apply-templates select="@*|node()"/></i>
    </xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="bold">
    <strong>
        <xsl:apply-templates select="@*|node()"/>
    </strong>
</xsl:template>

<xsl:template match="roman">
    <span data-ams-style="roman">
        <xsl:apply-templates select="@*|node()"/>
    </span>
</xsl:template>

<xsl:template match="sc">
    <span data-ams-style="sc">
        <xsl:apply-templates select="@*|node()"/>
    </span>
</xsl:template>

<xsl:template match="monospace">
    <span data-ams-style="monospace">
        <xsl:apply-templates select="@*|node()"/>
    </span>
</xsl:template>

<xsl:template match="underline">
    <span data-ams-style="underline">
        <xsl:apply-templates select="@*|node()"/>
    </span>
</xsl:template>

<!-- GROUP -->

<xsl:template match="disp-quote">
    <blockquote data-ams-style="{@specific-use}">
        <xsl:apply-templates/>
    </blockquote>
</xsl:template>

<xsl:template match="disp-quote/attrib">
    <footer>
        <span>
            <xsl:apply-templates/>
        </span>
    </footer>
</xsl:template>

<!-- GROUP -->

<xsl:template match="attrib">
    <span>
        <xsl:apply-templates/>
    </span>
</xsl:template>
<!-- NOTE repeated because fig-caption (below) needs a mode to be able to pull in attrib (else fig/attrib's ignore kicks in) -->
<xsl:template match="attrib" mode="generic">
    <span>
        <xsl:apply-templates/>
    </span>
</xsl:template>

<!-- GROUP -->

<xsl:template match="xref">
    <a href="#{@rid}" data-ams-ref="{@ref-type}"><xsl:apply-templates/></a>
</xsl:template>

<xsl:template match="xref[not(@rid)]">
    <span data-ams-ref="notrid"><xsl:apply-templates/></span>
</xsl:template>

<xsl:template match="xref[@ref-type='fn']">
<!-- TODO we could drop data-ams-ref if we don't use general purpose "[data-ams-ref]" selectors anywhere and if we change the \xhref extension -->
    <a href="#{@rid}" data-ams-ref="{@ref-type}" role="doc-noteref"><xsl:apply-templates/></a>
</xsl:template>

<xsl:template match="xref[@ref-type='bibr']">
    <cite><a href="#{@rid}" data-ams-ref="{@ref-type}" role="doc-biblioref"><xsl:apply-templates/></a></cite>
</xsl:template>

<!-- GROUP -->

<xsl:template match="fn">
    <span role="doc-footnote">
        <xsl:apply-templates select="@*|node()"/>
    </span>
</xsl:template>

<!-- GROUP -->

<xsl:template match="p//p[not(parent::def)] | fn//p">
  <span data-ams-doc="paragraph"><xsl:apply-templates select="@*|node()"/></span>
</xsl:template>

<!-- GROUP -->

<xsl:template match="back/app-group">
    <section role="doc-appendix">
        <xsl:apply-templates select="@*|node()"/>
    </section>
</xsl:template>

<xsl:template match="back/app-group/app">
    <section data-ams-doc-level="1">
        <xsl:apply-templates select="@*|node()"/>
    </section>
</xsl:template>

<!-- GROUP -->

<!-- NOTE chapters currently only appear in books -->
<!-- TODO add data-ams-doc-level="{@disp-level}" data-ams-doc="{@specific-use}" ?-->
<xsl:template match="sec[@specific-use='chapter']">
    <section role="doc-chapter">
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>

<xsl:template match="sec | ack | front-matter-part | front-matter/dedication">
<!-- NOTE ack, dedication have no disp-level, so data-ams-doc-level will be empty -->
<!-- TODO we have acknowledgments as app -->
    <section data-ams-doc-level="{@disp-level}" data-ams-doc="{@specific-use}">
        <xsl:if test="(self::dedication)">
            <xsl:attribute name="role">doc-dedication</xsl:attribute>
        </xsl:if>
        <xsl:if test="(starts-with(title, 'Acknowledg')) or (self::ack)">
            <xsl:attribute name="role">doc-acknowledgments</xsl:attribute>
        </xsl:if>
        <xsl:if test="starts-with(title, 'Introduction')">
            <xsl:attribute name="role">doc-introduction</xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>

<!-- NOTE app only applies in books since articles always have app within app-group (cf. template for app-group/app above) -->
<!-- TODO (BREAKING CHANGE) remove app-group/app and make app-group pass-through - the role should be on each app, not on wrapper from app-group; but watch out for app with Acknowledgements. -->
<!-- TODO should we add data-ams-doc-level="{@disp-level}" data-ams-doc="{@specific-use}"? We expect them for heading level computation. -->
<xsl:template match="app">
    <section role="doc-appendix">
        <xsl:apply-templates select="@*|node()"/>
    </section>
</xsl:template>

<xsl:template match="sec/title | sec/label | app/title | app/label | front-matter-part/title | front-matter-part/label">
<xsl:if test="not(following-sibling::title[1])">
    <xsl:variable name="displevel" select="../@disp-level"/>
    <xsl:variable name="level">
     <xsl:choose>
      <xsl:when test="/article"><xsl:value-of select="$displevel + 1"/></xsl:when>
      <xsl:when test="/book and ancestor::sec[@specific-use='chapter'] and ancestor::sec[@specific-use='part']"><xsl:value-of select="$displevel - 1"/></xsl:when>
      <xsl:otherwise><xsl:value-of select="$displevel"/></xsl:otherwise>
     </xsl:choose>
   </xsl:variable>
  <header>
    <xsl:text disable-output-escaping="yes">&lt;h</xsl:text><xsl:value-of select="$level" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
    <xsl:if test="preceding-sibling::label[1][text()] != ''">
        <xsl:apply-templates select="preceding-sibling::label[1]" mode="generic"/>
        <xsl:text>. </xsl:text>
    </xsl:if>
    <xsl:apply-templates select="@*|node()"/>
    <xsl:text disable-output-escaping="yes">&lt;/h</xsl:text><xsl:value-of select="$level" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
    <xsl:if test="following-sibling::subtitle">
    <p data-ams-doc="subtitle" data-ams-doc-level="{$level}"><xsl:apply-templates select="following-sibling::subtitle" mode="generic"/></p>
    </xsl:if>
  </header>
    <xsl:if test="preceding-sibling::sec-meta">
    <!-- NOTE sec-meta only occurs in 3 publications: MCL01, MCL14 and JAMS410; the tests only test for those specific situations -->
    <!-- TODO find a cleaner solution, e.g., general purpose markup + publication specific customization -->
    <section data-ams-doc="sec-meta">
    <!-- We pick&choose from whitelist since contrib-group templates are messy already -->
        <xsl:choose>
        <xsl:when test="ancestor::article"><!-- jams410 only -->
        <dl>
            <xsl:apply-templates select="preceding-sibling::sec-meta/contrib-group"/>
        </dl>
        </xsl:when>
        <xsl:otherwise><!-- MCL01, MCL14 only -->
            <xsl:apply-templates select="preceding-sibling::sec-meta/contrib-group"/>
        </xsl:otherwise>
        </xsl:choose>
        <xsl:apply-templates select="preceding-sibling::sec-meta/abstract"/>
    </section>
    </xsl:if>
</xsl:if>
</xsl:template>

<!-- GROUP -->

<xsl:template match="abstract">
    <section data-ams-doc-level="1" role="doc-abstract">
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>

<xsl:template match="abstract/title">
  <header>
    <h2><xsl:apply-templates select="@*|node()"/></h2>
  </header>
</xsl:template>

<!-- GROUP -->

<xsl:template match="statement">
    <xsl:variable name="level" select="ancestor::*[@disp-level][1]/@disp-level"/>
       <section data-ams-doc-level="{$level + 1}" data-ams-doc="statement" >
        <xsl:apply-templates select="@*|node()"/>
      </section>
</xsl:template>

<!-- NOTE same as book//sec-meta/abstract/title -->
<xsl:template match="statement/title">
  <xsl:variable name="displevel" select="ancestor::*[@disp-level][1]/@disp-level"/>
     <xsl:variable name="level">
     <xsl:choose>
      <xsl:when test="/article"><xsl:value-of select="$displevel + 2"/></xsl:when>
      <xsl:otherwise><xsl:value-of select="$displevel + 1"/></xsl:otherwise>
     </xsl:choose>
    </xsl:variable>

     <xsl:text disable-output-escaping="yes">&lt;h</xsl:text><xsl:value-of select="$level" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>         <xsl:if test="preceding-sibling::label[1][text()] != ''">
             <xsl:apply-templates select="preceding-sibling::label[1]" mode="generic"/>
             <xsl:text> </xsl:text>
         </xsl:if>
         <xsl:apply-templates select="@*|node()"/>
        <xsl:if test="not(starts-with(../@content-type, 'proof'))">
          <xsl:text>. </xsl:text>
        </xsl:if>
      <xsl:text disable-output-escaping="yes">&lt;/h</xsl:text><xsl:value-of select="$level " /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
</xsl:template>

<xsl:template match="statement/label">
    <xsl:if test="not(following-sibling::title[1])">
    <xsl:variable name="displevel" select="ancestor::*[@disp-level][1]/@disp-level"/>
    <xsl:variable name="level">
     <xsl:choose>
      <xsl:when test="/article"><xsl:value-of select="$displevel + 1"/></xsl:when>
      <xsl:otherwise><xsl:value-of select="$displevel"/></xsl:otherwise>
     </xsl:choose>
    </xsl:variable>
             <xsl:text disable-output-escaping="yes">&lt;h</xsl:text><xsl:value-of select="$level + 1" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
             <xsl:if test="preceding-sibling::label[1][text()] != ''"><!-- TODO This is never called; it would need two consecutive labels to trigger (in which case we would get multiple heading elements. Maybe it was thought to go after apply-templates below but that would create visual regressions, so let's do it at a later point.  -->
                 <xsl:apply-templates select="preceding-sibling::label[1]" mode="generic"/>
                 <xsl:text>. </xsl:text>
             </xsl:if>
             <xsl:apply-templates select="@*|node()"/>
             <xsl:text disable-output-escaping="yes">&lt;/h</xsl:text><xsl:value-of select="$level + 1" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
     </xsl:if>
</xsl:template>

<!-- NOTE: seems to be only used in proofs -->
<xsl:template match="statement/secheading/title | statement/secheading/label">
    <xsl:if test="not(following-sibling::title[1])">
    <span data-ams-doc="secheading">
        <xsl:if test="preceding-sibling::label[1][text()] != ''">
        <xsl:apply-templates select="preceding-sibling::label[1]" mode="generic"/>
        <xsl:text>. </xsl:text>
        </xsl:if>
    <xsl:apply-templates select="@*|node()"/>
    </span>
    </xsl:if>
</xsl:template>

<!-- GROUP -->

<xsl:template match="graphic | inline-graphic">
    <img data-ams-doc="{name()}" src="{@xlink:href}" alt="{../alt-text/text()}" data-ams-style="{@specific-use}" data-ams-width="{@width}" data-ams-height="{@height}"/>
</xsl:template>

<!-- GROUP -->

<!-- NOTE img should only appear inside HTML tables -->
<xsl:template match="img">
    <img src="{@src}" alt="{@alt}"/>
</xsl:template>

<!-- GROUP -->

<xsl:template match="fig | fig-group">
    <figure role="group">
        <xsl:apply-templates select="@id|@position|node()"/>
    </figure>
</xsl:template>

<xsl:template match="fig/caption | fig-group/caption">
  <figcaption>
    <xsl:if test="preceding-sibling::label[1][text()] != ''">
        <strong>
          <xsl:apply-templates select="preceding-sibling::label[1]" mode="generic"/>
        <xsl:text>. </xsl:text>
      </strong>
    </xsl:if>
      <xsl:apply-templates select="@*|node()"/>
      <xsl:apply-templates select="../attrib" mode="generic"/>
  </figcaption>
</xsl:template>

<xsl:template match="fig/label | fig-group/label">
  <xsl:if test="not(following-sibling::caption[1])">
    <figcaption>
        <strong>
        <xsl:apply-templates select="@*|node()"/>
        <xsl:text>. </xsl:text>
        </strong>
    </figcaption>
  </xsl:if>
</xsl:template>

<xsl:template match="fig-group/fig/caption">
  <figcaption>
    <xsl:if test="preceding-sibling::label[1][text()] != ''">
        <strong>
          <xsl:text>(</xsl:text>
          <xsl:apply-templates select="preceding-sibling::label[1]" mode="generic"/>
          <xsl:text>) </xsl:text>
      </strong>
    </xsl:if>
      <xsl:apply-templates select="@*|node()"/>
      <xsl:apply-templates select="../attrib" mode="generic"/>
  </figcaption>
</xsl:template>

<xsl:template match="fig-group/fig/label">
  <xsl:if test="not(following-sibling::caption[1])">
    <figcaption>
        <strong>
        <xsl:text>(</xsl:text>
        <xsl:apply-templates select="@*|node()"/>
        <xsl:text>) </xsl:text>
        </strong>
    </figcaption>
  </xsl:if>
</xsl:template>

<!-- GROUP -->

<!-- NOTE effectively only for books since articles do not have a TOC in XML -->
<xsl:template match="toc">
    <nav role="doc-toc">
        <xsl:apply-templates select="title-group"/>
        <ol>
            <xsl:apply-templates select="toc-entry"/>
        </ol>
    </nav>
</xsl:template>

<xsl:template match="toc-entry/title">
    <xsl:if test="preceding-sibling::label[1][text()] != ''">
        <xsl:apply-templates select="preceding-sibling::label[1]" mode="generic"/>
        <xsl:text>. </xsl:text>
    </xsl:if>
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="toc-entry">
    <li>
        <a href="#{nav-pointer/@rid}"><xsl:apply-templates select="title"/></a>
        <xsl:if test="toc-entry">
            <ol>
                <xsl:apply-templates select="toc-entry"/>
            </ol>
        </xsl:if>
    </li>
</xsl:template>

<!-- GROUP -->

<xsl:template match="def-list">
    <dl>
        <xsl:apply-templates select="@*|node()"/>
    </dl>
</xsl:template>

<xsl:template match="def-list/def-item">
    <div>
    <xsl:apply-templates select="node()"/>
    </div>
</xsl:template>
<xsl:template match="book//def-list/def-item">
    <xsl:apply-templates select="node()"/>
</xsl:template>

<xsl:template match="def-list/def-item/term">
    <dt id="{../@id}"><xsl:apply-templates select="@*|node()"/></dt>
</xsl:template>

<xsl:template match="def-list/def-item/def">
    <dd><xsl:apply-templates select="@*|node()"/></dd>
</xsl:template>

<!-- GROUP -->

<xsl:template match="inline-formula">
  <span data-ams-doc="math inline">
    <xsl:apply-templates/>
  </span>
  <xsl:if test="tex-math/fn">
    <xsl:apply-templates select="tex-math/fn" mode="generic"/>
  </xsl:if>
</xsl:template>

<xsl:template match="disp-formula">
  <span data-ams-doc="math block">
  <xsl:if test="tex-math[@has-qed-box]">
    <xsl:attribute name="data-ams-qed-box">
    <xsl:value-of select="(tex-math/@has-qed-box)[1]"/>
    </xsl:attribute>
  </xsl:if>
    <xsl:apply-templates/>
  </span>
  <xsl:if test="tex-math/fn">
    <xsl:apply-templates select="tex-math/fn" mode="generic"/>
  </xsl:if>
</xsl:template>

<!-- NOTE do not generalize to all descendants to avoid interference with tex-math//text -->
<xsl:template match="tex-math/xref">
  <xsl:choose>
  <xsl:when test="@ref-type='fn'">
  \xhref[<xsl:value-of select="@ref-type"/>]{#<xsl:value-of select="@rid"/>}{{}^{<xsl:value-of select="text()"/>}}
  </xsl:when>
  <xsl:otherwise>
  \xhref[<xsl:value-of select="@ref-type"/>]{#<xsl:value-of select="@rid"/>}{<xsl:value-of select="text()"/>}
  </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<!-- NOTE do not generalize to all descendants to avoid interference with tex-math//text -->
<xsl:template match="tex-math/fn" mode="generic">
    <span role="doc-footnote">
        <xsl:apply-templates select="@*|node()"/>
    </span>
</xsl:template>

<xsl:template match="tex-math//text">\text{<xsl:apply-templates/>}</xsl:template>

<xsl:template match="tex-math//text/xref">$\xhref[<xsl:value-of select="@ref-type"/>]{#<xsl:value-of select="@rid"/>}{<xsl:value-of select="text()"/>}$</xsl:template>

<!-- GROUP -->

<!-- TODO unify with book-back//ref-list template? -->
<xsl:template match="ref-list">
    <section role="doc-bibliography">
        <xsl:apply-templates select="title"/>
        <dl>
            <xsl:apply-templates select="ref"/>
        </dl>
    </section>
</xsl:template>

<xsl:template match="title">
<!-- TODO only seems used in ref-list/title -->
     <xsl:choose>
      <xsl:when test="/article">
          <h2><xsl:apply-templates select="@*|node()"/></h2>
        </xsl:when>
      <xsl:otherwise>
          <h1><xsl:apply-templates select="@*|node()"/></h1>
      </xsl:otherwise>
     </xsl:choose>
</xsl:template>

<xsl:template match="ref-list/ref">
  <dt id="{@id}">
    <xsl:apply-templates/>
  </dt>
</xsl:template>

<xsl:template match="ref-list/ref/label">
        <span><xsl:apply-templates/></span>
</xsl:template>

<!-- GROUP -->

<xsl:template match="mixed-citation">
    <dd>
      <div role="doc-biblioentry">
        <xsl:apply-templates select="@*|node()"/>
        <xsl:if test="../raw-citation">
          <code data-ams-doc="amsref">
            <xsl:value-of select="../raw-citation/text()"/>
          </code>
        </xsl:if>
      </div>
    </dd>
</xsl:template>

<!-- GROUP -->

<xsl:template match="ext-link">
  <a href="{@xlink:href}">
    <xsl:apply-templates/>
  </a>
</xsl:template>

<!-- GROUP -->

<!-- NOTE node() intentionally has no test, should it? -->
<xsl:template match="node()">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>

<!-- GROUP -->

<xsl:template match="@id|@rowspan|@colspan">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>

<!-- GROUP -->

<xsl:template match="@content-type">
      <xsl:attribute name="data-ams-content-type">
        <xsl:value-of select="."/>
      </xsl:attribute>
</xsl:template>

<!-- GROUP -->

<xsl:template match="@style">
      <xsl:attribute name="data-ams-style">
        <xsl:value-of select="."/>
      </xsl:attribute>
</xsl:template>

<!-- GROUP -->

<xsl:template match="@specific-use">
      <xsl:attribute name="data-ams-specific-use">
        <xsl:value-of select="."/>
      </xsl:attribute>
</xsl:template>

<!-- GROUP -->

<xsl:template match="@has-qed-box">
      <xsl:attribute name="data-ams-qed-box">
        <xsl:value-of select="."/>
      </xsl:attribute>
</xsl:template>

<!-- GROUP -->

<xsl:template match="@position">
      <xsl:attribute name="data-ams-position">
        <xsl:value-of select="."/>
      </xsl:attribute>
</xsl:template>

<!-- GROUP -->

<!-- NOTE @* intentionally has no test, should it? -->
<xsl:template match="@*">
</xsl:template>

<!-- GROUP -->

<xsl:template match="break"><br/></xsl:template>

<!-- GROUP -->

<xsl:template match="string-name"><span data-ams-doc="stringname"><xsl:apply-templates select="@*|node()"/></span></xsl:template>

<!-- GROUP -->

<xsl:template match="target"><span><xsl:apply-templates select="@*|node()"/></span></xsl:template>

<!-- GROUP -->

<xsl:template match="verse-group"><figure data-ams-doc="verse-group"><xsl:apply-templates select="@*|node()"/></figure></xsl:template>

</xsl:stylesheet>
