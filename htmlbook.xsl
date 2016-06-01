<?xml version="1.0" encoding="UTF-8"?>

<!-- Input: texml output -->

<!-- Output: https://github.com/oreillymedia/HTMLBook -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:xlink="http://www.w3.org/1999/xlink">


<xsl:output method="html"
            encoding ="utf-8"/>
            <xsl:preserve-space
              elements="abbrev abbrev-journal-title access-date addr-line
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
  <xsl:text>&#xd;</xsl:text>
  <xsl:apply-templates/>
</xsl:template>

<!-- BOOKS -->

<xsl:template match="book">
    <html>
        <head>
            <title>
              <xsl:apply-templates select="front-matter/book-meta/book-title-group/book-title"/>
              </title>

                <xsl:text disable-output-escaping="yes">&lt;meta content="charset=UTF-8"/&gt;</xsl:text>
                <xsl:text>&#xd;</xsl:text>
        </head>
        <body data-type="book" class="book">
            <xsl:apply-templates/>
        </body>
    </html>
</xsl:template>

<xsl:template match="front-matter|book-body|book-back|book-part">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="book-part/body">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="book-meta">
    <section data-type="titlepage" class="titlepage">
        <h1><xsl:apply-templates select="book-title-group"/></h1>
        <xsl:apply-templates select="contrib-group"/>
    </section>
</xsl:template>

<xsl:template match="book-title-group">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="book-title">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="book-back//ref-list">
    <section data-type="sect1">
        <xsl:apply-templates select="title"/>
        <dl class="thebibliography">
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
    <html>
        <head>
            <title>
              <xsl:apply-templates select="front/article-meta/title-group/article-title"/>
              </title>
              <xsl:text>&#xd;</xsl:text>
              <xsl:text disable-output-escaping="yes">&lt;link rel="stylesheet" href="jats-preview.css" type="text/css"/&gt;</xsl:text>
              <xsl:text>&#xd;</xsl:text>
            <xsl:text disable-output-escaping="yes">&lt;meta name="HTMLBook Sample" content="text/html; charset=UTF-8"/&gt;</xsl:text>
            <xsl:text>&#xd;</xsl:text>
        </head>
        <body data-type="book" class="book" id="htmlbook">                <xsl:text>&#xd;</xsl:text>
          <section data-type="titlepage" class="titlepage">
            <xsl:text>&#xd;</xsl:text>
            <header>
              <xsl:text>&#xd;</xsl:text>
        <h1>
            <xsl:apply-templates select="front/article-meta/title-group/article-title"/>
        </h1>
        <xsl:text>&#xd;</xsl:text>
        <xsl:apply-templates select="front/article-meta/contrib-group/contrib/name/given-names"/>
      <xsl:text>&#xd;</xsl:text>
            </header>
          <xsl:text>&#xd;</xsl:text>
          </section>
          <xsl:text>&#xd;</xsl:text>

          <section data-type="copyright-page">
            <xsl:text>&#xd;</xsl:text>
            <h1>
              <xsl:apply-templates select="front/article-meta/title-group/article-title"/>
              </h1>
              <xsl:text>&#xd;</xsl:text>
              <xsl:apply-templates select="front/article-meta/contrib-group/contrib/name/given-names"/>
          </section>
          <xsl:text>&#xd;</xsl:text>
          <section data-type="chapter" id="chapter01">
            <xsl:text>&#xd;</xsl:text>
            <h1>
              <xsl:apply-templates select="front/article-meta/title-group/article-title"/>
            </h1>
            <xsl:text>&#xd;</xsl:text>
            <xsl:apply-templates/>
          </section>
        <xsl:text>&#xd;</xsl:text>
        </body>
      <xsl:text>&#xd;</xsl:text>
    </html>
</xsl:template>

<xsl:template match="article/body">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="article-title">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="front"/>

<!-- SHARED -->

<xsl:template match="metainfo"/>

<xsl:template match="contrib-group|contrib">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="name">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="given-names">
    <p data-type="author">
        <xsl:apply-templates/>
    </p>
</xsl:template>

<xsl:template match="p">
    <xsl:if test="*|text()">
        <p>
            <xsl:if test="@content-type='noindent'">
                <xsl:attribute name="class">noindent</xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="@id|node()"/>
        </p>
    </xsl:if>
</xsl:template>

<xsl:template match="italic">
    <em>
        <xsl:apply-templates/>
    </em>
</xsl:template>

<xsl:template match="bold">
    <strong>
        <xsl:apply-templates/>
    </strong>
</xsl:template>

<xsl:template match="roman">
    <span style="font-style: normal">
        <xsl:apply-templates/>
    </span>
</xsl:template>

<xsl:template match="sc">
    <span style="font-variant: small-caps">
        <xsl:apply-templates/>
    </span>
</xsl:template>

<xsl:template match="disp-quote">
    <div style="{@specific-use}">
        <xsl:apply-templates/>
    </div>
</xsl:template>

<xsl:template match="xref">
    <a href="#{@rid}"><xsl:apply-templates/></a>
</xsl:template>

<xsl:template match="xref[@ref-type='bibr']">
    <cite><a href="#{@rid}"><xsl:apply-templates/></a></cite>
</xsl:template>

<xsl:template match="xref[@ref-type='fn']"/>

<xsl:template match="fn">
    <span data-type="footnote">
        <xsl:apply-templates select="@*|node()"/>
    </span>
</xsl:template>

<xsl:template match="fn/label">
</xsl:template>

<xsl:template match="fn/p">
    <xsl:if test="preceding-sibling::p">
        <br/><br/>
    </xsl:if>
    <xsl:apply-templates seelct="@*|node()"/>
</xsl:template>

<xsl:template match="sec">
    <div class="{@disp-level}body">
        <xsl:apply-templates select="@id"/>
        <xsl:apply-templates/>
    </div>
</xsl:template>


<xsl:template match="sec[@disp-level='section']/title">
  <header>
    <h1 class="{../@disp-level}head">
        <xsl:if test="preceding-sibling::label[1]">
            <xsl:value-of select="preceding-sibling::label[1]"/>
            <xsl:text>. </xsl:text>
        </xsl:if>
        <xsl:apply-templates select="@*|node()"/>
    </h1>
  </header>
</xsl:template>

<xsl:template match="sec[@disp-level='subsection']/title">
  <header>
    <h2 class="{../@disp-level}head">
        <xsl:if test="preceding-sibling::label[1]">
            <xsl:value-of select="preceding-sibling::label[1]"/>
            <xsl:text>. </xsl:text>
        </xsl:if>
        <xsl:apply-templates select="@*|node()"/>
    </h2>
  </header>
</xsl:template>

<xsl:template match="sec/label">
    <xsl:if test="not(following-sibling::title[1])">
    <div class="{../@disp-level}head"><xsl:apply-templates select="@*|node()"/></div>
    </xsl:if>
</xsl:template>

<xsl:template match="sec[@disp-level='chapter']">
    <section data-type='chapter'>
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>

<xsl:template match="sec[@disp-level='section']">
    <section data-type="sect1" class="sect1">
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>


<xsl:template match="sec[@disp-level='subsection']">
    <section data-type="sect2" class="sect2">
        <xsl:apply-templates select="@id|node()"/>
    </section>
</xsl:template>

<xsl:template match="statement">
  <xsl:variable name="level" select="ancestor::sec[1]/@disp-level"/>
     <xsl:choose>
     <xsl:when test=" $level = 'section'">
       <div data-type="sect2" data-jats="statement" data-jats-content-type="{@content-type}" class="{@content-type} {@style}">
        <xsl:apply-templates/>
      </div>
    </xsl:when>
         <xsl:otherwise>
           <div data-type="sect3" data-jats="statement" data-jats-content-type="{@content-type}" class="{@content-type} {@style}">
            <xsl:apply-templates/>
          </div>
         </xsl:otherwise>
   </xsl:choose>
</xsl:template>

<xsl:template match="statement/label">
  <xsl:variable name="level" select="ancestor::sec[1]/@disp-level"/>
     <xsl:choose>
     <xsl:when test=" $level = 'section'">
       <h2><xsl:apply-templates select="@*|node()"/></h2>
    </xsl:when>
         <xsl:otherwise>
           <h3><xsl:apply-templates select="@*|node()"/></h3>
         </xsl:otherwise>
   </xsl:choose>
</xsl:template>

<xsl:template match="fig">
    <figure>
        <xsl:apply-templates select="@id|node()"/>
    </figure>
</xsl:template>

<xsl:template match="fig/graphic">
    <img src="{@xlink:href}"/>
</xsl:template>


<xsl:template match="fig/caption">
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

<xsl:template match="fig/label">
</xsl:template>


<!-- <xsl:template match="statement">
  <xsl:variable name="level" select="ancestor::sec[1]/@disp-level"/>
     <xsl:choose>
     <xsl:when test=" $level = 'section'">
       <div data-type="sect2" data-jats="statement" data-jats-content-type="{@content-type}" class="{@content-type} {@style}">
        <xsl:apply-templates/>
      </div>
    </xsl:when>
         <xsl:otherwise>
           <section data-type="sect3" data-jats="statement" data-jats-content-type="{@content-type}" class="{@content-type} {@style}">
            <xsl:apply-templates/>
          </section>
         </xsl:otherwise>
   </xsl:choose>
</xsl:template>

<xsl:template match="statement/label">
  <xsl:variable name="level" select="ancestor::sec[1]/@disp-level"/>
     <xsl:choose>
     <xsl:when test=" $level = 'section'">
       <header>
       <h2><xsl:apply-templates select="@*|node()"/></h2>
     </header>
    </xsl:when>
         <xsl:otherwise>
           <header>
           <h3><xsl:apply-templates select="@*|node()"/></h3>
         </header>
         </xsl:otherwise>
   </xsl:choose>
</xsl:template> -->


<xsl:template match="sec[@disp-level='chapter']/title">
    <h1>
        <xsl:if test="preceding-sibling::label[1]">
            <xsl:value-of select="preceding-sibling::label[1]"/>
            <xsl:text>. </xsl:text>
        </xsl:if>
        <xsl:apply-templates select="@*|node()"/>
    </h1>
</xsl:template>

<xsl:template match="sec[@disp-level='chapter']/label">
    <xsl:if test="not(following-sibling::title[1])">
        <h1><xsl:apply-templates select="@*|node()"/></h1>
    </xsl:if>
</xsl:template>
<!--
<xsl:template match="sec[@disp-level='section']/title">
    <h1>
        <xsl:if test="preceding-sibling::label[1]">
            <xsl:value-of select="preceding-sibling::label[1]"/>
            <xsl:text>. </xsl:text>
        </xsl:if>
        <xsl:apply-templates select="@*|node()"/>
    </h1>
</xsl:template> -->

<xsl:template match="sec[@disp-level='section']/label">
    <xsl:if test="not(following-sibling::title[1])">
        <h1><xsl:apply-templates select="@*|node()"/></h1>
    </xsl:if>
</xsl:template>

<xsl:template match="toc">
    <nav data-type="toc" class="toc" id="toc">
        <xsl:apply-templates select="title-group"/>
        <ol style="list-style-type:none">
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
            <ol style="list-style-type:none">
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
    <xsl:apply-templates select="@*|node()"/>
</xsl:template>

<xsl:template match="def-list/def-item/term">
    <dt><xsl:apply-templates select="@*|node()"/></dt>
</xsl:template>

<xsl:template match="def-list/def-item/def">
    <dd><xsl:apply-templates select="@*|node()"/></dd>
</xsl:template>

<xsl:template match="inline-formula">
  <xsl:apply-templates/>
    </xsl:template>

<xsl:template match="disp-formula">
    <xsl:if test="parent::fn">
        <xsl:if test="preceding-sibling::p">
            <br/><br/>
        </xsl:if>
    </xsl:if>
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="alternatives">
  <xsl:apply-templates/>
    </xsl:template>

<xsl:template match="math">
  <!-- this stylesheet simply copies MathML through. If your browser
       supports it, you will get it -->
  <xsl:copy>
    <xsl:copy-of select="@*"/>
    <xsl:apply-templates/>
  </xsl:copy>
</xsl:template>

<xsl:template match="tex-math">
<!-- drop TeX -->
</xsl:template>

<xsl:template match="sec/ref-list">
    <section data-type="sect1">
        <xsl:apply-templates select="title"/>
        <dl class="thebibliography">
            <xsl:apply-templates select="ref"/>
        </dl>
    </section>
</xsl:template>

<xsl:template match="ref-list/ref">
    <xsl:apply-templates/>
</xsl:template>

<xsl:template match="ref-list/ref/label">
    <dt id="{@id}">
        <span class="refname"><xsl:apply-templates/></span>
    </dt>
</xsl:template>

<xsl:template match="mixed-citation">
    <dd>
        <xsl:apply-templates select="@*|node()"/>
    </dd>
</xsl:template>

<xsl:template match="@*|node()">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>

</xsl:stylesheet>
