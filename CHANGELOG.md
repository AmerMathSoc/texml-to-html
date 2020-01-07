# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.6.0...v4.0.0) (2020-01-07)


### Bug Fixes

* abstact() ([5989d36](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5989d36))
* add toc-toc-entry test case ([79009d2](https://github.com/AmerMathSoc/ams-xml-to-html/commit/79009d2))
* article() remove duplicate ', ' after journalLocation ([63f42df](https://github.com/AmerMathSoc/ams-xml-to-html/commit/63f42df))
* change fallback title value ([5879bee](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5879bee))
* clean up whitespace in *-formula ([13d338b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/13d338b))
* contrib-group should create DD ([e766f31](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e766f31))
* disp-quote: move blockquote out of paragraphs ([62dbcba](https://github.com/AmerMathSoc/ams-xml-to-html/commit/62dbcba))
* DL should not be placed inside paragraph ([edd8240](https://github.com/AmerMathSoc/ams-xml-to-html/commit/edd8240))
* element-abstract-title.js ([515803e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/515803e))
* element-article-meta.js ([75e57db](https://github.com/AmerMathSoc/ams-xml-to-html/commit/75e57db))
* element-toc-toc-entry.js pass XSL and JS ([9cc6105](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9cc6105))
* email() fix check for next sibling ([edaa42e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/edaa42e))
* fix img alt-text ([b1dbcdf](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b1dbcdf))
* funding-statements should be wrapped in 1 DD ([7557915](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7557915))
* inline-formula less agressive regex ([3fecaef](https://github.com/AmerMathSoc/ams-xml-to-html/commit/3fecaef))
* inline-formula: ignore has-qed-box ([58fa420](https://github.com/AmerMathSoc/ams-xml-to-html/commit/58fa420))
* label(): fix sec-meta when label+title ([e230fae](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e230fae))
* move ams-meta-group to pass-through elements ([5296412](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5296412))
* nested p should look at output not input ([aeffe9d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/aeffe9d))
* nested toc-entries should remain nested ([778b7b3](https://github.com/AmerMathSoc/ams-xml-to-html/commit/778b7b3))
* pass element-inline-formula-disp-formula-tex-math in both JS and XSL ([eec8e76](https://github.com/AmerMathSoc/ams-xml-to-html/commit/eec8e76))
* preface data-ams-doc-level ([affb6d2](https://github.com/AmerMathSoc/ams-xml-to-html/commit/affb6d2))
* primary() description can be complex ([8a72585](https://github.com/AmerMathSoc/ams-xml-to-html/commit/8a72585))
* primary(): trim description element before processing ([ee55b5d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ee55b5d))
* pub-date: handle multiple revisions ([a127049](https://github.com/AmerMathSoc/ams-xml-to-html/commit/a127049))
* publisher add pass-through ([2545a39](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2545a39))
* sec-meta in article ([c340cf5](https://github.com/AmerMathSoc/ams-xml-to-html/commit/c340cf5))
* sec() fix data-ams-doc-level for ack ([d066ac8](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d066ac8))
* sec() handle articles with parts ([0b90e64](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0b90e64))
* sec(): restrict header to subtitle ([7c4a81f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7c4a81f))
* setHead should add viewport meta for book ([379fe92](https://github.com/AmerMathSoc/ams-xml-to-html/commit/379fe92))
* setHead: actually attach charset meta tag ([6f02bec](https://github.com/AmerMathSoc/ams-xml-to-html/commit/6f02bec))
* setHead: add charset meta tag ([aa50102](https://github.com/AmerMathSoc/ams-xml-to-html/commit/aa50102))
* setHead: fix charset value ([39cee56](https://github.com/AmerMathSoc/ams-xml-to-html/commit/39cee56))
* simplify check for book ([f1f03ca](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f1f03ca))
* simplify createNode ([b104534](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b104534))
* switch head to match xslt ([0e9bbb0](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0e9bbb0))
* update package.json ([c4962e9](https://github.com/AmerMathSoc/ams-xml-to-html/commit/c4962e9))
* various minor issues ([b2e4ea9](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b2e4ea9))
* xref() xref in fn in tex-math ([d64ed07](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d64ed07))
* **article.xml:** add sec-meta example ([2d39441](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2d39441))


### Features

* add simple CLI ([d477c7c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d477c7c))
* add test for setHead ([75de4fa](https://github.com/AmerMathSoc/ams-xml-to-html/commit/75de4fa))
* move main.js into ams-xml-to-html.js ([6beed5f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/6beed5f))
* pass attribut-style.js ([9b0a374](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9b0a374))
* pass attribute-content-type.js ([330b5da](https://github.com/AmerMathSoc/ams-xml-to-html/commit/330b5da))
* pass attribute-has-qed-box.js ([23829c3](https://github.com/AmerMathSoc/ams-xml-to-html/commit/23829c3))
* pass attribute-hidden.js ([324679e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/324679e))
* pass attribute-rowspan-colspan.js ([605808d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/605808d))
* pass attribute-specific-use.js ([7f23975](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7f23975))
* pass element-abstract-title.js ([92929c0](https://github.com/AmerMathSoc/ams-xml-to-html/commit/92929c0))
* pass element-ams-meta-group.js ([342db06](https://github.com/AmerMathSoc/ams-xml-to-html/commit/342db06))
* pass element-article-citation.js ([5df3765](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5df3765))
* pass element-article-js ([75a84dc](https://github.com/AmerMathSoc/ams-xml-to-html/commit/75a84dc))
* pass element-article-meta.js ([363de28](https://github.com/AmerMathSoc/ams-xml-to-html/commit/363de28))
* pass element-article.js ([f27b61c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f27b61c))
* pass element-article.js ([eb89a7c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/eb89a7c))
* pass element-attrib.js ([d04463a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d04463a))
* pass element-back-app-grou-app.js ([2c4991a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2c4991a))
* pass element-bold.js ([1717a4c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1717a4c))
* pass element-book-meta-publisher.js ([d14d667](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d14d667))
* pass element-book-meta.j ([ba2bb52](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ba2bb52))
* pass element-book-meta.js ([d74a6d2](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d74a6d2))
* pass element-book-preface.js ([b3d2f5e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b3d2f5e))
* pass element-book-preface.js ([1e2cbe2](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1e2cbe2))
* pass element-book-sec-meta.js ([4db9aae](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4db9aae))
* pass element-book-title-group.js ([91ae522](https://github.com/AmerMathSoc/ams-xml-to-html/commit/91ae522))
* pass element-book-title-group.js ([bdd1042](https://github.com/AmerMathSoc/ams-xml-to-html/commit/bdd1042))
* pass element-book.js ([e2d5a9a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e2d5a9a))
* pass element-break.js ([f6f6629](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f6f6629))
* pass element-contrib-group.js, element-contrib.js ([ad82bd1](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ad82bd1))
* pass element-copyright-statement.js ([c9b50cb](https://github.com/AmerMathSoc/ams-xml-to-html/commit/c9b50cb))
* pass element-email.js ([a960d12](https://github.com/AmerMathSoc/ams-xml-to-html/commit/a960d12))
* pass element-ext-link.js ([7181024](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7181024))
* pass element-fig-subfig-label.js ([ed89275](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ed89275))
* pass element-fn.js ([82cf7ea](https://github.com/AmerMathSoc/ams-xml-to-html/commit/82cf7ea))
* pass element-graphic-inline-graphic.js, element-img.js ([e6071c6](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e6071c6))
* pass element-inline-formula-disp-formula-tex-math.js ([b26ac8c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b26ac8c))
* pass element-italic.js ([183a0af](https://github.com/AmerMathSoc/ams-xml-to-html/commit/183a0af))
* pass element-journal-meta ([c0fa4b3](https://github.com/AmerMathSoc/ams-xml-to-html/commit/c0fa4b3))
* pass element-kwd-group-kwd.js ([1a6bbd2](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1a6bbd2))
* pass element-mixed-citation.js ([0b6542f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0b6542f))
* pass element-monospace, roman, sc, underline ([e797fc7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e797fc7))
* pass element-note-dedication ([c08aef1](https://github.com/AmerMathSoc/ams-xml-to-html/commit/c08aef1))
* pass element-note-dedication ([4f50464](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4f50464))
* pass element-p-p.js, element-def-list-def-item-def-term ([802ef8e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/802ef8e))
* pass element-pub-date-date.js ([059b787](https://github.com/AmerMathSoc/ams-xml-to-html/commit/059b787))
* pass element-ref-list-ref-label.js, element-book-ref-list.js ([7c3f541](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7c3f541))
* pass element-sec-app-front-matter-part-dedication-title-label.js ([67cfa78](https://github.com/AmerMathSoc/ams-xml-to-html/commit/67cfa78))
* pass element-self-uri.js ([0b574cf](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0b574cf))
* pass element-statement-label-title.js ([d0e5009](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d0e5009))
* pass element-string-name.js ([0814b0b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0814b0b))
* pass element-stripEmptyLabel.js ([59dac45](https://github.com/AmerMathSoc/ams-xml-to-html/commit/59dac45))
* pass element-styled-content.js ([246863a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/246863a))
* pass element-target.js ([1fab624](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1fab624))
* pass element-toc-toc-entry.js ([760206f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/760206f))
* pass element-verse-group.js ([ddb24ba](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ddb24ba))
* pass element-xref.js ([1537117](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1537117))
* pass elemnt-funding-group.js ([aec1f9a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/aec1f9a))
* pass elment-disp-quote.js ([59f0250](https://github.com/AmerMathSoc/ams-xml-to-html/commit/59f0250))
* pass-through x in books ([05bcf3b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/05bcf3b)), closes [#250](https://github.com/AmerMathSoc/ams-xml-to-html/issues/250)
* refactoring into modules ([a6866a7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/a6866a7))
* reimplement sec() level calculation ([a037daa](https://github.com/AmerMathSoc/ams-xml-to-html/commit/a037daa))
* sec-meta - adjust to upstream changes ([3929728](https://github.com/AmerMathSoc/ams-xml-to-html/commit/3929728)), closes [#249](https://github.com/AmerMathSoc/ams-xml-to-html/issues/249)
* support element cite-group ([27f8484](https://github.com/AmerMathSoc/ams-xml-to-html/commit/27f8484))
* support kwd-group, kwd properly ([5923c16](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5923c16))
* support pre elements ([76a7397](https://github.com/AmerMathSoc/ams-xml-to-html/commit/76a7397))
* **statement:** add period to proof title&lable ([32a736c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/32a736c)), closes [#243](https://github.com/AmerMathSoc/ams-xml-to-html/issues/243)
* publisher-name, publisher-loc ([68e1fcd](https://github.com/AmerMathSoc/ams-xml-to-html/commit/68e1fcd))
* ref-list, (partially) title, mapAttributes ([2e9bc9f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2e9bc9f))
* support sup, sub ([82b7c62](https://github.com/AmerMathSoc/ams-xml-to-html/commit/82b7c62))


### BREAKING CHANGES

* adjusts to breaking change in texml.



## [3.6.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.5.0...v3.6.0) (2019-11-11)


### Features

* **statement:** add period to proof title&lable ([60c2c7a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/60c2c7a)), closes [#243](https://github.com/AmerMathSoc/ams-xml-to-html/issues/243)



## [3.5.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.4.0...v3.5.0) (2019-10-31)


### Features

* support hidden attribute ([afb568d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/afb568d)), closes [#241](https://github.com/AmerMathSoc/ams-xml-to-html/issues/241)



## [3.4.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.3.2-0...v3.4.0) (2019-10-30)


### Features

* xref/x generalize pass through ([27c6257](https://github.com/AmerMathSoc/ams-xml-to-html/commit/27c6257)), closes [#240](https://github.com/AmerMathSoc/ams-xml-to-html/issues/240)



### [3.3.2-0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.3.1...v3.3.2-0) (2019-10-02)


### Bug Fixes

* revise statement/title, statement/label ([cccc023](https://github.com/AmerMathSoc/ams-xml-to-html/commit/cccc023)), closes [#239](https://github.com/AmerMathSoc/ams-xml-to-html/issues/239)
* statement heading level in book with part ([4eaf7a8](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4eaf7a8)), closes [#238](https://github.com/AmerMathSoc/ams-xml-to-html/issues/238)



### [3.3.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.3.1-1...v3.3.1) (2019-09-17)



### [3.3.1-1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.3.1-0...v3.3.1-1) (2019-09-13)


### Bug Fixes

* **ref-list/ref:** avoid invalid dd-in-dt nesting ([245e786](https://github.com/AmerMathSoc/ams-xml-to-html/commit/245e786)), closes [#234](https://github.com/AmerMathSoc/ams-xml-to-html/issues/234)
* **xref@ref-type='bibr'/x:** restore pass-through ([fdaf124](https://github.com/AmerMathSoc/ams-xml-to-html/commit/fdaf124)), closes [#235](https://github.com/AmerMathSoc/ams-xml-to-html/issues/235)



### [3.3.1-0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.3.0...v3.3.1-0) (2019-09-12)


### Bug Fixes

* remove dead code article-meta/title-group ([4e62231](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4e62231)), closes [#233](https://github.com/AmerMathSoc/ams-xml-to-html/issues/233)
* tex-math//text/xref remove newlines ([9a98440](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9a98440))



## [3.3.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.2.0...v3.3.0) (2019-08-14)


### Features

* **book-meta:** preserve publ_key ([d4f65e4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d4f65e4)), closes [#230](https://github.com/AmerMathSoc/ams-xml-to-html/issues/230)



## [3.2.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.1.1...v3.2.0) (2019-07-31)


### Bug Fixes

* **label:** ignore (some) empty labels ([b2ff3c7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b2ff3c7)), closes [#226](https://github.com/AmerMathSoc/ams-xml-to-html/issues/226)


### Features

* **fig:** wrap subfigure labels in parentheses ([9df3c53](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9df3c53)), closes [#227](https://github.com/AmerMathSoc/ams-xml-to-html/issues/227)
* **tests:** add initial test suite setup ([79baa46](https://github.com/AmerMathSoc/ams-xml-to-html/commit/79baa46)), closes [#226](https://github.com/AmerMathSoc/ams-xml-to-html/issues/226) [#202](https://github.com/AmerMathSoc/ams-xml-to-html/issues/202)
* **tests:** revise helper.js ([04d1d08](https://github.com/AmerMathSoc/ams-xml-to-html/commit/04d1d08)), closes [#228](https://github.com/AmerMathSoc/ams-xml-to-html/issues/228)



### [3.1.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v3.1.0...v3.1.1) (2019-07-16)


### Bug Fixes

* p//p template should exclude nested def-list ([b630af8](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b630af8)), closes [#225](https://github.com/AmerMathSoc/ams-xml-to-html/issues/225)



## 3.1.0 (2019-07-08)


### Features

* automate releases ([b03708e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b03708e)), closes [#224](https://github.com/AmerMathSoc/ams-xml-to-html/issues/224)
* preserve graphic dimensions ([42223e9](https://github.com/AmerMathSoc/ams-xml-to-html/commit/42223e9)), closes [#221](https://github.com/AmerMathSoc/ams-xml-to-html/issues/221)



## 3.0.0 (2019-05-20)



## 3.0.0-3 (2019-05-16)


### Features

* rename to ams-xml-to-html ([17f7d64](https://github.com/AmerMathSoc/ams-xml-to-html/commit/17f7d64)), closes [#117](https://github.com/AmerMathSoc/ams-xml-to-html/issues/117)
* revise data attributes ([764037f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/764037f)), closes [#216](https://github.com/AmerMathSoc/ams-xml-to-html/issues/216) [#219](https://github.com/AmerMathSoc/ams-xml-to-html/issues/219)



## 3.0.0-2 (2019-05-10)


### Features

* data-ams-doc=chapter => role=doc-chapter ([80e3719](https://github.com/AmerMathSoc/ams-xml-to-html/commit/80e3719)), closes [#215](https://github.com/AmerMathSoc/ams-xml-to-html/issues/215) [#218](https://github.com/AmerMathSoc/ams-xml-to-html/issues/218)


### BREAKING CHANGES

* changes data attribute



## 3.0.0-1 (2019-05-10)


### Features

* revise data-type attributes ([40fd04b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/40fd04b)), closes [#215](https://github.com/AmerMathSoc/ams-xml-to-html/issues/215)


### BREAKING CHANGES

* 



## 2.16.0 (2019-04-09)


### Features

* **figures:** support [@position](https://github.com/position) ([f9fd039](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f9fd039)), closes [#210](https://github.com/AmerMathSoc/ams-xml-to-html/issues/210)



### 2.15.4 (2019-04-03)


### Bug Fixes

* turn fn//p to span ([63a2f05](https://github.com/AmerMathSoc/ams-xml-to-html/commit/63a2f05)), closes [#214](https://github.com/AmerMathSoc/ams-xml-to-html/issues/214)



### 2.15.3 (2019-04-02)


### Bug Fixes

* label[generic] should not process attributes ([3d9bf5f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/3d9bf5f)), closes [#212](https://github.com/AmerMathSoc/ams-xml-to-html/issues/212)
* strip nested p tags ([9cdaac7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9cdaac7)), closes [#213](https://github.com/AmerMathSoc/ams-xml-to-html/issues/213)



### 2.15.2 (2019-03-29)


### Bug Fixes

* **article-citation:** use code tag ([034b890](https://github.com/AmerMathSoc/ams-xml-to-html/commit/034b890)), closes [#211](https://github.com/AmerMathSoc/ams-xml-to-html/issues/211)



### 2.15.1 (2019-03-29)


### Bug Fixes

* **tex-math:**  handle text descendants ([704d4d6](https://github.com/AmerMathSoc/ams-xml-to-html/commit/704d4d6)), closes [#209](https://github.com/AmerMathSoc/ams-xml-to-html/issues/209)



## 2.15.0 (2019-03-25)


### Bug Fixes

* do not strip [@colspan](https://github.com/colspan), [@rowspan](https://github.com/rowspan) ([b4cf64e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b4cf64e)), closes [#207](https://github.com/AmerMathSoc/ams-xml-to-html/issues/207)
* enable complex content in label ([21aac98](https://github.com/AmerMathSoc/ams-xml-to-html/commit/21aac98)), closes [#206](https://github.com/AmerMathSoc/ams-xml-to-html/issues/206)
* turn dedication into div ([2134f6c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2134f6c)), closes [#204](https://github.com/AmerMathSoc/ams-xml-to-html/issues/204)


### Features

* **mixed-citation:** use code for raw-citation ([f892a16](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f892a16)), closes [#205](https://github.com/AmerMathSoc/ams-xml-to-html/issues/205)



### 2.14.1 (2019-03-20)


### Bug Fixes

* **bibliography:** remove [@id](https://github.com/id) from template ([84a943e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/84a943e)), closes [#203](https://github.com/AmerMathSoc/ams-xml-to-html/issues/203)



## 2.14.0 (2019-02-14)


### Features

* add template for xref[not([@rid](https://github.com/rid))] ([9c17b23](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9c17b23)), closes [#201](https://github.com/AmerMathSoc/ams-xml-to-html/issues/201)



## 2.13.0 (2019-02-07)


### Features

* support footnotes in tex-math ([f97d534](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f97d534)), closes [#200](https://github.com/AmerMathSoc/ams-xml-to-html/issues/200)



### 2.12.4 (2019-01-23)



### 2.12.3 (2019-01-22)



### 2.12.2 (2019-01-16)



### 2.12.1 (2019-01-10)



## 2.12.0 (2018-12-11)



### 2.11.4 (2018-11-28)



### 2.11.3 (2018-11-28)



### 2.11.2 (2018-11-26)



### 2.11.1 (2018-11-22)



## 2.11.0 (2018-11-13)



## 2.10.0 (2018-11-12)



## 2.9.0 (2018-11-07)



## 2.8.0 (2018-11-06)



## 2.7.0 (2018-11-05)



## 2.6.0 (2018-10-30)



### 2.5.1 (2018-10-30)



## 2.5.0 (2018-10-25)



## 2.4.0 (2018-10-19)



## 2.3.0 (2018-09-24)



## 2.2.0 (2018-09-11)



## 2.1.0 (2018-09-06)



## 2.0.0 (2018-09-05)



## 1.4.0 (2018-07-24)



## 1.3.0 (2018-07-18)



## 1.2.0 (2018-05-29)



## 1.2.0-alpha (2018-05-29)



### 1.1.1 (2018-05-09)



## 1.1.0 (2018-04-19)



## 1.0.0 (2018-01-04)
