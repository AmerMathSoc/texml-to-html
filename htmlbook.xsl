<?xml version="1.0" encoding="UTF-8"?>

<!-- Input: texml output -->

<!-- Output: https://github.com/oreillymedia/HTMLBook -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:xlink="http://www.w3.org/1999/xlink" exclude-result-prefixes="xlink">


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
                        gov inline-formula inline-supplementary-material
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
                        mo ms mtext"/>

<xsl:template match="/">
  <xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
  <xsl:text>&#xa;</xsl:text>
  <xsl:text disable-output-escaping="yes">&lt;html&gt;</xsl:text>
  <xsl:apply-templates/>
</xsl:template>

<!-- BOOKS -->

<xsl:template match="book">
<head>
    <title>
        <xsl:apply-templates select="book-meta/book-title-group/book-title/text()"/>
        </title>
        <xsl:text>&#xa;</xsl:text>
</head>
<body data-type="book">
    <xsl:apply-templates/>
</body>
  <xsl:text disable-output-escaping="yes">&lt;/html&gt;</xsl:text>
</xsl:template>

<xsl:template match="front-matter|book-body|book-back|book-part|named-book-part-body">
    <xsl:apply-templates/>
</xsl:template>
<xsl:template match="book-part-meta">
</xsl:template>

<xsl:template match="book-part/body">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="preface">
    <section data-type='preface'>
        <xsl:apply-templates select="@*|node()"/>
    </section>
</xsl:template>

<xsl:template match="book-meta">
    <section data-type="titlepage">
        <xsl:apply-templates select="book-title-group"/>
        <xsl:apply-templates select="contrib-group"/>
        <footer>
        <p>Published by</p>
        <xsl:apply-templates select="publisher"/>
        <p>DOI <a data-jats="doi" href="https://doi.org/{book-id[@book-id-type = 'doi']/text()}"><xsl:value-of select="book-id[@book-id-type = 'doi']/text()"/></a></p>
      </footer>
    </section>
</xsl:template>

<xsl:template match="book-title-group">
    <header><xsl:apply-templates/></header>
</xsl:template>

<xsl:template match="book-title">
    <h1 data-jats="title"><xsl:apply-templates select="@*|node()"/></h1>
</xsl:template>

<xsl:template match="subtitle">
    <p data-jats="subtitle"><xsl:apply-templates select="@*|node()"/></p>
</xsl:template>

<xsl:template match="book-meta/publisher">
    <p data-jats="publisher"><xsl:apply-templates select="@*|node()"/></p>
</xsl:template>

<xsl:template match="book-meta/publisher/publisher-name">
    <span data-jats="publisher name"><xsl:apply-templates select="@*|node()"/>,</span>
</xsl:template>
<xsl:template match="book-meta/publisher/publisher-loc">
    <span data-jats="publisher loc"><xsl:apply-templates select="@*|node()"/></span>
</xsl:template>

<xsl:template match="book-back//ref-list">
    <section data-type="sect1" role="doc-bibliography">
        <xsl:apply-templates select="title"/>
        <dl data-jats="bibliography">
            <xsl:apply-templates select="ref"/>
        </dl>
    </section>
</xsl:template>

<xsl:template match="app">
    <section data-type="appendix">
        <xsl:apply-templates select="@*|node()"/>
    </section>
</xsl:template>

<!-- ARTICLES -->

<xsl:template match="article">
<head>
    <title>
        <xsl:apply-templates select="front/article-meta/title-group/article-title"/>
        </title>
        <xsl:text>&#xa;</xsl:text>
        <!-- <xsl:text disable-output-escaping="yes">&lt;link rel="stylesheet" href="jats-preview.css" type="text/css"/&gt;</xsl:text> -->
        <xsl:text>&#xa;</xsl:text>
    <xsl:text>&#xa;</xsl:text>
</head>
<body data-type="book">
    <xsl:text>&#xa;</xsl:text>
    <section data-type="titlepage">
    <xsl:text>&#xa;</xsl:text>
    <header>
        <xsl:text>&#xa;</xsl:text>
        <aside data-jats="journal">
        <xsl:text>&#xa;</xsl:text>
        <p data-jats="title"><xsl:value-of select="front/journal-meta/journal-title-group/journal-title/text()"/></p>
        <p data-jats="location"><span data-jats="volume">Volume <xsl:value-of select="front/article-meta/volume/text()"/>, </span><span data-jats="issue">Issue <xsl:value-of select="front/article-meta/issue/text()"/></span><span data-jats="date">(<xsl:value-of select="front/article-meta/pub-date/@iso-8601-date"/>)</span></p>
        <p data-jats="pii"><a href="https://doi.org/{front/article-meta/article-id[@pub-id-type = 'doi']/text()}"><xsl:value-of select="front/article-meta/article-id[@pub-id-type = 'pii']/text()"/></a></p>
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
    <section data-type="chapter" id="chapter01">
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
  <section data-type="copyright-page">
    <xsl:text>&#xa;</xsl:text>
    <h1>Article Information</h1>
    <dl>
      <xsl:apply-templates select="ams-meta-group"/>
      <xsl:if test="kwd-group">
      <dt>Keywords</dt>
      <dd data-jats="keywords">
        <xsl:apply-templates select="kwd-group"/>
      </dd>
      </xsl:if>
      <dt>Author Information</dt>
      <dd data-jats="authors">
        <xsl:apply-templates select="contrib-group[@content-type='authors']"/>
      </dd>
        <xsl:apply-templates select="funding-group"/>
      <!-- HACK until texml makes them identifiable them https://github.com/AmerMathSoc/ams-article-sources/issues/5 -->
      <xsl:if test="custom-meta-group/custom-meta[@specific-use='communicated-by']">
        <dt><xsl:apply-templates select="custom-meta-group/custom-meta[@specific-use='communicated-by']/meta-name/text()"/></dt>
        <dd data-jats="communicatedby">
          <xsl:apply-templates select="custom-meta-group/custom-meta[@specific-use='communicated-by']/meta-value/text()"/>
        </dd>
      </xsl:if>
      <dt>Journal Information</dt>
      <dd>
        <xsl:apply-templates select="../journal-meta"/>
      </dd>
      <dt>Publication History</dt>
      <dd data-jats="pub history">
        <xsl:apply-templates select="pub-date"/>
      </dd>
      <xsl:apply-templates select="permissions/copyright-statement"/>
      <dt>Article References</dt>
      <dd data-jats="articlerefs">
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
    <h1>
      <xsl:apply-templates/>
    </h1>
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
  <aside role="doc-dedication">
    <xsl:apply-templates/>
  </aside>
</xsl:template>

<xsl:template match="front/journal-meta">
      <a data-jats="journal name" href="{self-uri/@xlink:href}"><xsl:value-of select="journal-title-group/journal-title"/></a>, <span data-jats="journal volume">Volume <xsl:value-of select="../article-meta/volume"/></span>, <span data-jats="journal issue">Issue <xsl:value-of select="../article-meta/issue"/></span>, ISSN <span data-jats="journal issn"><xsl:value-of select="journal-title-group/issn"/></span>, published by the
      <span data-jats="publisher name"><xsl:value-of select="publisher/publisher-name"/></span>, <span data-jats="publisher location"><xsl:value-of select="publisher/publisher-loc"/></span>.
</xsl:template>

<xsl:template match="contrib-group[@content-type='authors']">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="contrib-group/contrib[@contrib-type='author']">
  <dl data-jats="author">
    <dt data-jats="author name">
      <xsl:value-of select="name/given-names"/>&#160;<xsl:value-of select="name/surname"/>
    </dt>
      <xsl:apply-templates select="xref[@ref-type='aff']"/>
    <xsl:if test="email">
    <dd>
      <a href="mailto://{email/text()}">
        <xsl:value-of select="email"/>
      </a>
    </dd>
    </xsl:if>
    <xsl:if test="uri">
      <dd><a href="{uri/text()}" data-jats="author homepage">Homepage</a></dd>
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

<xsl:template match="article-meta/pub-date">
    This article was received on <time data-jats="pub received" datetime="{../history/date[@date-type='received']/@iso-8601-date}"><xsl:value-of select="../history/date[@date-type='received']/@iso-8601-date"/></time><xsl:if test="../history/date[@date-type='rev-recd']"><xsl:text>,&#xA0;</xsl:text>revised on <xsl:apply-templates select="../history/date[@date-type='rev-recd']"/>
    </xsl:if>
    and published on <time data-jats="pub published" datetime="{@iso-8601-date}"><xsl:value-of select="@iso-8601-date"/></time>.
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="article-meta/history/date[@date-type='rev-recd']"><time data-jats="pub revised" datetime="{@iso-8601-date}"><xsl:value-of select="@iso-8601-date"/></time>,
</xsl:template>


<xsl:template match="ams-meta-group">
  <dt data-jats="msc">MSC <xsl:value-of select="msc/@scheme"/></dt>
  <xsl:apply-templates/>
</xsl:template>

<xsl:template match="ams-meta-group/msc">
  <xsl:if test="primary">
    <dd data-jats="msc primary">Primary:
    <xsl:for-each select="primary">
    <a href="http://www.ams.org/msc/msc2010.html?t={key/text()}"><xsl:value-of select="key/text()"/> (<xsl:value-of select="description/text()"/>)</a>
    <xsl:choose>
      <xsl:when test="position() != last()">, </xsl:when>
    </xsl:choose>
    </xsl:for-each>
    </dd>
  </xsl:if>
  <xsl:if test="secondary">
    <dd data-jats="msc secondary">Secondary:
    <xsl:for-each select="secondary">
    <a href="http://www.ams.org/msc/msc2010.html?t={key/text()}"><xsl:value-of select="key/text()"/> (<xsl:value-of select="description/text()"/>)</a>
    <xsl:choose>
      <xsl:when test="position() != last()">, </xsl:when>
    </xsl:choose>
    </xsl:for-each>
    </dd>
  </xsl:if>
</xsl:template>

<xsl:template match="article-meta/permissions/copyright-statement">
  <dt>Copyright Information</dt>
  <dd data-jats="copyright"><xsl:apply-templates/></dd>
</xsl:template>

<xsl:template match="article-meta/self-uri">
  <li>
  <a href="{@xlink:href}" data-jats="{@content-type}">
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
  <dt>Funding</dt>
  <dd data-jats="fundinginfo"><xsl:apply-templates/></dd>
</xsl:template>

<xsl:template match="article-meta/article-citation">
  <li><span>
    <pre data-jats="amsref">
      <xsl:value-of select="text()"/>
    </pre></span>
  </li>
</xsl:template>


<xsl:template match="contrib-group/contrib/xref[@ref-type='aff']">
  <dd data-jats="affiliation">
  <xsl:variable name="link" select="./@rid" />
  <xsl:if test="../../aff[@id = $link]/@specific-use = 'current'">
      <xsl:attribute name="data-jats">affiliation current</xsl:attribute>
      <span>Address at time of publication: </span>
  </xsl:if>
  <xsl:value-of select="../../aff[@id = $link]/text()"/>
</dd>
</xsl:template>


<xsl:template match="name | surname | given-names | aff | email | contrib-id | pub-date/* | history | volume | issue | copyright-year | x | article-categories | raw-citation">
</xsl:template>

<xsl:template match="article-meta/kwd-group/kwd">
  <li><xsl:apply-templates/></li>
</xsl:template>

<xsl:template match="article-meta/article-id">
    <xsl:if test="@pub-id-type = 'doi'">
      <li>
        DOI <a data-jats="doi" href="https://doi.org/{text()}"><xsl:value-of select="text()"/></a>
      </li>
    </xsl:if>
    <xsl:if test="@pub-id-type = 'mr'">
      <!-- TODO What is the correct URL prefix? -->
      <li>
        <a data-jats-="mr" href="http://www.ams.org/mathscinet-getitem?mr={text()}">MathSciNet Review</a>
      </li>
    </xsl:if>
</xsl:template>


<xsl:template match="front"/>

<!-- SHARED -->

<xsl:template match="metainfo"/>

<xsl:template match="contrib-group|contrib | permissions| article-meta/funding-group/funding-statement | article-meta/custom-meta-group">
    <xsl:apply-templates/>
</xsl:template>



<xsl:template match="p">
    <xsl:if test="*|text()">
        <p>
            <xsl:if test="@content-type='noindent'">
                <xsl:attribute name="data-jats">noindent</xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="@id|node()"/>
        </p>
    </xsl:if>
</xsl:template>

<xsl:template match="italic">
<xsl:choose>
    <xsl:when test="@toggle='yes'">
        <em><xsl:apply-templates/></em>
    </xsl:when>
    <xsl:otherwise>
        <i><xsl:apply-templates/></i>
    </xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="bold">
    <strong>
        <xsl:apply-templates/>
    </strong>
</xsl:template>

<xsl:template match="roman">
    <span data-jats-style="roman">
        <xsl:apply-templates/>
    </span>
</xsl:template>

<xsl:template match="sc">
    <span data-jats-style="sc">
        <xsl:apply-templates/>
    </span>
</xsl:template>

<xsl:template match="disp-quote">
    <blockquote data-jats-style="{@specific-use}">
        <xsl:apply-templates/>
    </blockquote>
</xsl:template>

<xsl:template match="attrib">
    <footer>
        <cite>
            <xsl:apply-templates/>
        </cite>
    </footer>
</xsl:template>


<xsl:template match="xref">
    <a href="#{@rid}" data-jats="{@ref-type}"><xsl:apply-templates/></a>
</xsl:template>

<xsl:template match="xref[@ref-type='fn']">
    <a href="#{@rid}" data-jats="{@ref-type}" role="doc-noteref"><xsl:apply-templates/></a>
</xsl:template>

<xsl:template match="xref[@ref-type='bibr']">
    <cite><a href="#{@rid}" data-jats="{@ref-type}" role="doc-biblioref"><xsl:apply-templates/></a></cite>
</xsl:template>

<xsl:template match="fn">
    <span data-type="footnote" role="doc-footnote">
        <xsl:apply-templates select="@*|node()"/>
    </span>
</xsl:template>

<xsl:template match="fn/label">
</xsl:template>

<xsl:template match="fn/p">
    <xsl:if test="preceding-sibling::p">
        <br/><br/>
    </xsl:if>
    <xsl:apply-templates select="@*|node()"/>
</xsl:template>

<xsl:template match="sec[@disp-level!='0']/title">
  <header>
    <xsl:variable name="level" select="../@disp-level"/>
    <xsl:variable name="use" select="../@specific-use"/>
    <xsl:text disable-output-escaping="yes">&lt;h</xsl:text><xsl:value-of select="$level" /> data-jats="<xsl:value-of select="$use" />head" <xsl:text disable-output-escaping="yes">&gt;</xsl:text>
        <xsl:if test="preceding-sibling::label[1]">
            <xsl:value-of select="preceding-sibling::label[1]"/>
            <xsl:text>. </xsl:text>
        </xsl:if>
        <xsl:apply-templates select="@*|node()"/>
    <xsl:text disable-output-escaping="yes">&lt;/h</xsl:text><xsl:value-of select="$level" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
  </header>
</xsl:template>

<xsl:template match="sec/label">
    <xsl:if test="not(following-sibling::title[1])">
    <div data-jats="{../@specific-use}head"><xsl:apply-templates select="@*|node()"/></div>
    </xsl:if>
</xsl:template>

<xsl:template match="sec[@specific-use='chapter']">
    <section data-type='chapter'>
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>

<xsl:template match="sec">
    <section data-type="sect{@disp-level}">
        <xsl:if test="starts-with(title, 'Acknowledg')">
            <xsl:attribute name="role">doc-acknowledgments</xsl:attribute>
        </xsl:if>
        <xsl:if test="starts-with(title, 'Introduction')">
            <xsl:attribute name="role">doc-introduction</xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>

<xsl:template match="abstract">
    <section data-type="sect1" data-jats="abstract" role="doc-abstract">
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>

<xsl:template match="abstract/title">
  <header>
    <h1><xsl:apply-templates select="@*|node()"/></h1>
  </header>
</xsl:template>

<xsl:template match="statement">
  <xsl:variable name="level" select="ancestor::*[@disp-level][1]/@disp-level"/>
       <section data-type="sect{$level + 1}" data-jats="statement" >
        <xsl:apply-templates select="@*|node()"/>
      </section>
</xsl:template>

<xsl:template match="statement/title">
  <xsl:variable name="level" select="ancestor::*[@disp-level][1]/@disp-level"/>
     <xsl:text disable-output-escaping="yes">&lt;h</xsl:text><xsl:value-of select="$level + 1" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>         <xsl:if test="preceding-sibling::label[1]">
             <xsl:value-of select="preceding-sibling::label[1]"/>
             <xsl:text>. </xsl:text>
         </xsl:if>
         <xsl:apply-templates select="@*|node()"/>
      <xsl:text disable-output-escaping="yes">&lt;/h</xsl:text><xsl:value-of select="$level + 1" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
</xsl:template>

<xsl:template match="statement/label">
    <xsl:if test="not(following-sibling::title[1])">
      <xsl:variable name="level" select="ancestor::*[@disp-level][1]/@disp-level"/>
             <xsl:text disable-output-escaping="yes">&lt;h</xsl:text><xsl:value-of select="$level + 1" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
             <xsl:if test="preceding-sibling::label[1]">
                 <xsl:value-of select="preceding-sibling::label[1]"/>
                 <xsl:text>. </xsl:text>
             </xsl:if>
             <xsl:apply-templates select="@*|node()"/>
             <xsl:text disable-output-escaping="yes">&lt;/h</xsl:text><xsl:value-of select="$level + 1" /><xsl:text disable-output-escaping="yes">&gt;</xsl:text>
     </xsl:if>
</xsl:template>

<xsl:template match="fig | fig-group">
    <figure role="group">
        <xsl:apply-templates select="@id|node()"/>
    </figure>
</xsl:template>

<xsl:template match="fig/graphic | inline-graphic">
  <!-- TODO handle alt text after ams-doc-sources/#9 -->
    <img data-jats="{name()}" src="{@xlink:href}"/>
</xsl:template>


<xsl:template match="fig/caption | fig-group/caption">
  <figcaption>
    <xsl:if test="preceding-sibling::label[1]">
        <strong>
          <xsl:value-of select="preceding-sibling::label[1]"/>
        <xsl:text>. </xsl:text>
      </strong>
    </xsl:if>
      <xsl:apply-templates select="@*|node()"/>
  </figcaption>
</xsl:template>

<xsl:template match="fig/label | fig-group/label">
</xsl:template>

<xsl:template match="sec[@specific-use='chapter']/title">
    <h1>
        <xsl:if test="preceding-sibling::label[1]">
            <xsl:value-of select="preceding-sibling::label[1]"/>
            <xsl:text>. </xsl:text>
        </xsl:if>
        <xsl:apply-templates select="@*|node()"/>
    </h1>
</xsl:template>

<xsl:template match="sec[@specific-use='chapter']/label">
    <xsl:if test="not(following-sibling::title[1])">
        <h1><xsl:apply-templates select="@*|node()"/></h1>
    </xsl:if>
</xsl:template>

<xsl:template match="toc">
    <nav data-type="toc" id="toc" role="doc-toc">
        <xsl:apply-templates select="title-group"/>
        <ol>
            <xsl:apply-templates select="toc-entry"/>
        </ol>
    </nav>
</xsl:template>

<xsl:template match="title-group">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="title">
    <h1><xsl:apply-templates select="@*|node()"/></h1>
</xsl:template>

<xsl:template match="toc-entry/title">
    <xsl:if test="preceding-sibling::label[1]">
        <xsl:value-of select="preceding-sibling::label[1]"/>
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

<xsl:template match="def-list">
    <dl>
        <xsl:apply-templates select="@*|node()"/>
    </dl>
</xsl:template>

<xsl:template match="def-list/def-item">
    <xsl:apply-templates select="node()"/>
</xsl:template>

<xsl:template match="def-list/def-item/term">
    <dt id="{../@id}"><xsl:apply-templates select="@*|node()"/></dt>
</xsl:template>

<xsl:template match="def-list/def-item/def">
    <dd><xsl:apply-templates select="@*|node()"/></dd>
</xsl:template>

<xsl:template match="inline-formula">
  <span data-jats="math inline">
    <xsl:apply-templates/>
  </span>
</xsl:template>

<xsl:template match="disp-formula">
  <span data-jats="math block">
    <xsl:apply-templates/>
  </span>
</xsl:template>

<xsl:template match="alternatives">
  <xsl:apply-templates/>
    </xsl:template>

<xsl:template match="math">
</xsl:template>

<xsl:template match="tex-math">
  <xsl:apply-templates/>
</xsl:template>

<xsl:template match="disp-formula/alternatives/textual-form | inline-formula/alternatives/textual-form">
</xsl:template>

<xsl:template match="back">
  <xsl:apply-templates/>
    </xsl:template>

<xsl:template match="back/ref-list">
    <section data-type="bibliography">
        <xsl:apply-templates select="title"/>
        <dl>
            <xsl:apply-templates select="ref"/>
        </dl>
    </section>
</xsl:template>

<xsl:template match="ref-list/ref">
  <dt id="{@id}">
    <xsl:apply-templates/>
  </dt>
</xsl:template>

<xsl:template match="ref-list/ref/label">
        <span data-jats="refname"><xsl:apply-templates/></span>
</xsl:template>

<xsl:template match="mixed-citation">
    <dd>
      <span role="doc-biblioentry">
        <xsl:apply-templates select="@*|node()"/>
        <xsl:if test="../raw-citation">
          <pre data-jats="amsref">
            <xsl:value-of select="../raw-citation/text()"/>
          </pre>
        </xsl:if>
      </span>
    </dd>
</xsl:template>

<xsl:template match="ext-link">
  <a href="{@xlink:href}">
    <xsl:apply-templates/>
  </a>
</xsl:template>

<xsl:template match="back/app-group">
    <section data-type="appendix" role="doc-appendix">
        <xsl:apply-templates select="@*|node()"/>
    </section>
</xsl:template>

<xsl:template match="back/app-group/app">
    <section data-type="sect1">
        <xsl:apply-templates select="@*|node()"/>
    </section>
</xsl:template>

<xsl:template match="app/title">
  <header>
    <h1 data-jats="{../@specific-use}head">
        <xsl:if test="preceding-sibling::label[1]">
            <xsl:value-of select="preceding-sibling::label[1]"/>
            <xsl:text>. </xsl:text>
        </xsl:if>
        <xsl:apply-templates select="@*|node()"/>
    </h1>
  </header>
</xsl:template>

<xsl:template match="app/label">
    <xsl:if test="not(following-sibling::title[1])">
        <h1><xsl:apply-templates select="@*|node()"/></h1>
    </xsl:if>
</xsl:template>

<xsl:template match="node()">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>
<xsl:template match="@id">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>
<xsl:template match="@content-type">
      <xsl:attribute name="data-jats-content-type">
        <xsl:value-of select="."/>
      </xsl:attribute>
</xsl:template>
<xsl:template match="@style">
      <xsl:attribute name="data-jats-content-style">
        <xsl:value-of select="."/>
      </xsl:attribute>
</xsl:template>
<xsl:template match="@*">
</xsl:template>

</xsl:stylesheet>
