# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [18.7.0](https://github.com/AmerMathSoc/texml-to-html/compare/v18.6.0...v18.7.0) (2025-07-02)


### Features

* **toc-entry.js:** preserve style attribute ([1e500e9](https://github.com/AmerMathSoc/texml-to-html/commit/1e500e9d3a1a6ad87878c69759fe0449ba8b033b)), closes [#484](https://github.com/AmerMathSoc/texml-to-html/issues/484)

## [18.6.0](https://github.com/AmerMathSoc/texml-to-html/compare/v18.5.0...v18.6.0) (2025-06-12)


### Features

* **graphic.js:** adjust to new alt-text placement ([1468543](https://github.com/AmerMathSoc/texml-to-html/commit/146854336e3ef3cc6a34a6b70cfb522bd6ceceb2)), closes [#477](https://github.com/AmerMathSoc/texml-to-html/issues/477)


### Bug Fixes

* **package:** upgrade linkedom@0.18.10 ([06d48ac](https://github.com/AmerMathSoc/texml-to-html/commit/06d48ac562b9627c3b6b2e55647526ca2af58937))

## [18.5.0](https://github.com/AmerMathSoc/texml-to-html/compare/v18.4.0...v18.5.0) (2025-05-19)


### Features

* **book-meta-json.js:** support issue note ([52bb0be](https://github.com/AmerMathSoc/texml-to-html/commit/52bb0be03ce504dca93623f648e5995398ade119)), closes [#480](https://github.com/AmerMathSoc/texml-to-html/issues/480)
* **book-meta:** support abstract, keywords, MSCs ([1aee280](https://github.com/AmerMathSoc/texml-to-html/commit/1aee28047bc8f69c0c5067fc088e11272be24993)), closes [#479](https://github.com/AmerMathSoc/texml-to-html/issues/479)

## [18.4.0](https://github.com/AmerMathSoc/texml-to-html/compare/v18.3.0...v18.4.0) (2025-05-05)


### Features

* **book-meta-json.js:** collection contributors ([04fb7ae](https://github.com/AmerMathSoc/texml-to-html/commit/04fb7aefeb1077b4b1e51f50188ebb7b78f9e7ea)), closes [#481](https://github.com/AmerMathSoc/texml-to-html/issues/481)
* **book-meta-json.js:** support book-issue-number ([32dd1a6](https://github.com/AmerMathSoc/texml-to-html/commit/32dd1a611b29fe35c76912f7bda5709238687e68)), closes [#476](https://github.com/AmerMathSoc/texml-to-html/issues/476)
* **book-meta-json.js:** support pub-date&history ([29155a7](https://github.com/AmerMathSoc/texml-to-html/commit/29155a723e37e1c4b846c119d12b8e225c7ef33c)), closes [#478](https://github.com/AmerMathSoc/texml-to-html/issues/478)

## [18.3.0](https://github.com/AmerMathSoc/texml-to-html/compare/v18.2.0...v18.3.0) (2025-02-24)


### Features

* **abstract.js:** support lang attribute ([4f27f2a](https://github.com/AmerMathSoc/texml-to-html/commit/4f27f2a1f87951e4020ec3add9087b6806162f5e)), closes [#474](https://github.com/AmerMathSoc/texml-to-html/issues/474)

## [18.2.0](https://github.com/AmerMathSoc/texml-to-html/compare/v18.1.0...v18.2.0) (2025-02-05)


### Features

* **attrib.js:** add data-ams-doc ([70fa67c](https://github.com/AmerMathSoc/texml-to-html/commit/70fa67ca59b92d1ff18900d430b107ceef7f2d9c)), closes [#462](https://github.com/AmerMathSoc/texml-to-html/issues/462)
* replace applyHacks() with fixContentModel() ([0cb4ae7](https://github.com/AmerMathSoc/texml-to-html/commit/0cb4ae7fbcdc4006b51d43b8cd0398dd4cbb2b30)), closes [#473](https://github.com/AmerMathSoc/texml-to-html/issues/473)
* revise tag and target in text equations ([d7244f6](https://github.com/AmerMathSoc/texml-to-html/commit/d7244f6a8212336754a112657b9e14bb9e0e20a9)), closes [#429](https://github.com/AmerMathSoc/texml-to-html/issues/429)


### Bug Fixes

* **app.js:** remove unused ternary path ([f459df1](https://github.com/AmerMathSoc/texml-to-html/commit/f459df12b6f4582138e001cb8c7ae0ddf5125ecd)), closes [#470](https://github.com/AmerMathSoc/texml-to-html/issues/470)
* **disp-quote.js:** remove outdated workaround ([390482a](https://github.com/AmerMathSoc/texml-to-html/commit/390482a82bd84762e3b8d1ec5191b38c50e29d02)), closes [#472](https://github.com/AmerMathSoc/texml-to-html/issues/472)
* **disp-quote:** footer is last child ([ee46ad7](https://github.com/AmerMathSoc/texml-to-html/commit/ee46ad7a326ac029ca03adbfe63da1d41bbc2798)), closes [#457](https://github.com/AmerMathSoc/texml-to-html/issues/457) [#463](https://github.com/AmerMathSoc/texml-to-html/issues/463)
* **formula.js:** remove whitespace clean-up ([6f673f4](https://github.com/AmerMathSoc/texml-to-html/commit/6f673f49e146e08b4647a12122f30ddac88f9e1b)), closes [#424](https://github.com/AmerMathSoc/texml-to-html/issues/424)
* **formula.js:** trim inner whitespace ([2ae7130](https://github.com/AmerMathSoc/texml-to-html/commit/2ae7130ef1d1d27f4e26a46686c7ec211936d0ec)), closes [#471](https://github.com/AmerMathSoc/texml-to-html/issues/471)
* remove book-title.js ([57610a8](https://github.com/AmerMathSoc/texml-to-html/commit/57610a8a86ba8e3409d78fcc0dfbe813f9d68b4d)), closes [#254](https://github.com/AmerMathSoc/texml-to-html/issues/254) [#448](https://github.com/AmerMathSoc/texml-to-html/issues/448)
* remove meta-name.js and meta-value.js ([2bbc8e0](https://github.com/AmerMathSoc/texml-to-html/commit/2bbc8e05b75b72d3f60968d9c891050b16935cde)), closes [#254](https://github.com/AmerMathSoc/texml-to-html/issues/254) [#448](https://github.com/AmerMathSoc/texml-to-html/issues/448)
* remove subject-group.js and subject.js ([9fefa46](https://github.com/AmerMathSoc/texml-to-html/commit/9fefa4616d0ebe2068e1dd0d1db56a83fae3ed8b)), closes [#254](https://github.com/AmerMathSoc/texml-to-html/issues/254) [#448](https://github.com/AmerMathSoc/texml-to-html/issues/448)
* revise label/title/etc handling ([804904a](https://github.com/AmerMathSoc/texml-to-html/commit/804904a4bf21878e302bc328a4bbdbee0bbe4f90)), closes [#467](https://github.com/AmerMathSoc/texml-to-html/issues/467) [#452](https://github.com/AmerMathSoc/texml-to-html/issues/452)
* **sec.js:** workaround nested book-app ([1ec8680](https://github.com/AmerMathSoc/texml-to-html/commit/1ec86805829838288453e8a2ff4140c11a79bc02)), closes [#460](https://github.com/AmerMathSoc/texml-to-html/issues/460)

## [18.1.0](https://github.com/AmerMathSoc/texml-to-html/compare/v18.0.0...v18.1.0) (2024-09-09)


### Features

* **sec.js:** support style attribute ([84c7699](https://github.com/AmerMathSoc/texml-to-html/commit/84c769970c4841a696e681766a7348a8a6900b9e)), closes [#461](https://github.com/AmerMathSoc/texml-to-html/issues/461)

## [18.0.0](https://github.com/AmerMathSoc/texml-to-html/compare/v18.0.0-0...v18.0.0) (2024-08-16)

## [18.0.0-0](https://github.com/AmerMathSoc/texml-to-html/compare/v17.1.0...v18.0.0-0) (2024-08-13)


### ⚠ BREAKING CHANGES

* label.js no longer generates
punctuation&space in label (with title) but adds space
between label and title (if both present); also no longer adds
space and possible punctuation after theorem title.
* secheading no longer generates
punctuation+space in label, but spaces after label&title.
* caption.js no longer generates
punctuation after label nor parentheses around subfigure
labels.
* toc-entry no longer generates
punctuation after label.
* xref-group now preserved in tex-math
* cite-detail no longer unwrapped in tex-math
* book-app-groups are no longer
forcibly marked as parts and level.
* all x elements are now preserved as
ams-x, i.e. downstream will need to remove unwanted ones.

* feat!(label.js): stop adding "generated text" ([4b9543d](https://github.com/AmerMathSoc/texml-to-html/commit/4b9543d0d04ffb1d0b79f3046b95fc180fa13d92)), closes [#454](https://github.com/AmerMathSoc/texml-to-html/issues/454)
* feat!(secheading.js): stop adding "generated text" ([d98265e](https://github.com/AmerMathSoc/texml-to-html/commit/d98265e57560690a3f793c49493e74751d9202f9)), closes [#454](https://github.com/AmerMathSoc/texml-to-html/issues/454)
* feat!(caption.js): stop adding "generated text" ([3d17ff1](https://github.com/AmerMathSoc/texml-to-html/commit/3d17ff1b52ba459d9facda1c01b6ad301b046992)), closes [#454](https://github.com/AmerMathSoc/texml-to-html/issues/454)
* feat!(toc-entry.js): stop adding "generated text" ([1981ae3](https://github.com/AmerMathSoc/texml-to-html/commit/1981ae371bc1c7770903381c2c22966858b452dd)), closes [#454](https://github.com/AmerMathSoc/texml-to-html/issues/454)
* feat!(xref-groupl.js): preserve in tex-math ([133d8a5](https://github.com/AmerMathSoc/texml-to-html/commit/133d8a529446fa47d75f3a02bab0ee42c26aba23)), closes [#456](https://github.com/AmerMathSoc/texml-to-html/issues/456)
* feat!(cite-detail.js): preserve in tex-math ([0a570fe](https://github.com/AmerMathSoc/texml-to-html/commit/0a570feb05678164db0e7834c32977b2fa74182a)), closes [#455](https://github.com/AmerMathSoc/texml-to-html/issues/455)
* feat!(sec.js): revise book-app-group output ([2f4e06a](https://github.com/AmerMathSoc/texml-to-html/commit/2f4e06a117a62a49489b413c6cc26436773b0a36)), closes [#436](https://github.com/AmerMathSoc/texml-to-html/issues/436)
* feat!(x.js): preserve all x elements as ams-x ([5b77a86](https://github.com/AmerMathSoc/texml-to-html/commit/5b77a8642fe78bfd56fb5bfc753d67e9bbd3d719)), closes [#445](https://github.com/AmerMathSoc/texml-to-html/issues/445)


### Features

* **algorithm.js:** support missing line no. delimiter ([0ef3047](https://github.com/AmerMathSoc/texml-to-html/commit/0ef3047623af712c11bae148c372d623ee611b10)), closes [#453](https://github.com/AmerMathSoc/texml-to-html/issues/453)


### Bug Fixes

* **package.json:** replace standard-version ([5db8c62](https://github.com/AmerMathSoc/texml-to-html/commit/5db8c62ccbb441b4902b0bb30db8e568d1a486d2)), closes [#458](https://github.com/AmerMathSoc/texml-to-html/issues/458)
* secheading, toc-entry should match label.js ([4e9d7ef](https://github.com/AmerMathSoc/texml-to-html/commit/4e9d7eff09e3c481dbb4c917f8e31ac23a6db03e)), closes [#454](https://github.com/AmerMathSoc/texml-to-html/issues/454)

## [17.1.0](https://github.com/AmerMathSoc/texml-to-html/compare/v17.0.1...v17.1.0) (2024-07-04)


### Features

* **toc-entry.js:** add label/title wrappers ([2165072](https://github.com/AmerMathSoc/texml-to-html/commit/2165072dc60ff9fd7c40ad6f65221eaa6f0924a2)), closes [#451](https://github.com/AmerMathSoc/texml-to-html/issues/451)

### [17.0.1](https://github.com/AmerMathSoc/texml-to-html/compare/v17.0.0...v17.0.1) (2024-06-07)


### Bug Fixes

* handle cite-group, cite-detail inside tex-math ([0df8528](https://github.com/AmerMathSoc/texml-to-html/commit/0df85280d892ee33572f0923f6e56197bbb26a34)), closes [#450](https://github.com/AmerMathSoc/texml-to-html/issues/450)

## [17.0.0](https://github.com/AmerMathSoc/texml-to-html/compare/v16.1.1...v17.0.0) (2024-06-07)


### ⚠ BREAKING CHANGES

* Expects role instead author-comment

### Features

* adjust to texml renaming author-comment to role ([c46822b](https://github.com/AmerMathSoc/texml-to-html/commit/c46822b9e6cbd96de1893c8e138f3f14df48492c)), closes [#449](https://github.com/AmerMathSoc/texml-to-html/issues/449)

### [16.1.1](https://github.com/AmerMathSoc/texml-to-html/compare/v16.1.0...v16.1.1) (2024-06-03)


### Bug Fixes

* **hacks.js:** treat custom elements like phrasing content ([ab7c158](https://github.com/AmerMathSoc/texml-to-html/commit/ab7c1583a635f095de6dc9c3315ceb4c3a50d63e)), closes [#447](https://github.com/AmerMathSoc/texml-to-html/issues/447)

## [16.1.0](https://github.com/AmerMathSoc/texml-to-html/compare/v16.0.0...v16.1.0) (2024-06-03)


### Features

* **book-meta.json.js:** preserve LCCN if present ([4426d63](https://github.com/AmerMathSoc/texml-to-html/commit/4426d632aa0e804ac516b39aea62186aa2c32751)), closes [#440](https://github.com/AmerMathSoc/texml-to-html/issues/440)
* support cite-group and cite-detail ([dc832cf](https://github.com/AmerMathSoc/texml-to-html/commit/dc832cf7a4b002a8c6dc3725df34b814a306239a)), closes [#443](https://github.com/AmerMathSoc/texml-to-html/issues/443)
* **toc-entry.js:** support specific-use attribute ([b11a3c9](https://github.com/AmerMathSoc/texml-to-html/commit/b11a3c955bc1601b425612a0a9ede0213e163bdd)), closes [#444](https://github.com/AmerMathSoc/texml-to-html/issues/444)

## [16.0.0](https://github.com/AmerMathSoc/texml-to-html/compare/v15.2.1...v16.0.0) (2024-04-29)


### ⚠ BREAKING CHANGES

* Nested `a` are now "flattened" to `span`.

### Features

* revise treatment of nested links ([cdc63a9](https://github.com/AmerMathSoc/texml-to-html/commit/cdc63a970cc14c87ae6faa115ae2484bb03fe339)), closes [#442](https://github.com/AmerMathSoc/texml-to-html/issues/442)


### Bug Fixes

* **xref.js:** warn on nested link not inside toc-entry ([a59b69e](https://github.com/AmerMathSoc/texml-to-html/commit/a59b69e205cc9296d65668e364040995144e564e)), closes [#442](https://github.com/AmerMathSoc/texml-to-html/issues/442)

### [15.2.1](https://github.com/AmerMathSoc/texml-to-html/compare/v15.2.0...v15.2.1) (2024-03-29)

## [15.2.0](https://github.com/AmerMathSoc/texml-to-html/compare/v15.1.1...v15.2.0) (2024-03-29)


### Features

* **formula.js:** mapAttributes() but from tex-math ([3e1f603](https://github.com/AmerMathSoc/texml-to-html/commit/3e1f603032d278fccc138bd20c2eda746a8f32e2)), closes [#441](https://github.com/AmerMathSoc/texml-to-html/issues/441)

### [15.1.1](https://github.com/AmerMathSoc/texml-to-html/compare/v15.1.0...v15.1.1) (2023-12-13)


### Bug Fixes

* **mixed-citation.js:** fix HTML escaping ([4df1462](https://github.com/AmerMathSoc/texml-to-html/commit/4df14624280786ad870c4e0c2940275f6054eae8)), closes [#438](https://github.com/AmerMathSoc/texml-to-html/issues/438)

## [15.1.0](https://github.com/AmerMathSoc/texml-to-html/compare/v15.0.0...v15.1.0) (2023-11-23)


### Features

* **label.js:** preserve title and label ([5dae34f](https://github.com/AmerMathSoc/texml-to-html/commit/5dae34f1dfeaf8fa884303f7de2518b35d52c38b)), closes [#327](https://github.com/AmerMathSoc/texml-to-html/issues/327)


### Bug Fixes

* **package:** upgrade linkedom ([34ae8a7](https://github.com/AmerMathSoc/texml-to-html/commit/34ae8a7f48c2d6f2744e22c9f07aed4159a1f896))

## [15.0.0](https://github.com/AmerMathSoc/texml-to-html/compare/v14.0.1...v15.0.0) (2023-11-02)


### ⚠ BREAKING CHANGES

* rename to texml-to-html, prepare publication

### Features

* rename to texml-to-html, prepare publication ([61d141b](https://github.com/AmerMathSoc/texml-to-html/commit/61d141bba054799ae2f430fce814d07ac5fee77b))

### [14.0.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v14.0.0...v14.0.1) (2023-10-20)


### Bug Fixes

* **extractContribuGroups:** surname-only names ([7ecc1f7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7ecc1f78fb9a42f5bc61259f6737ed15aafae762)), closes [#432](https://github.com/AmerMathSoc/ams-xml-to-html/issues/432)

## [14.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.7.1...v14.0.0) (2023-10-04)


### ⚠ BREAKING CHANGES

* Introduces tex-math elements inside
data-ams-doc=math which contain the TeX strings as well as
data-ams-doc="tags" for copies of tags

### Features

* revise formula elements handling ([1896c1a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1896c1a29a342f6cd546e209c74786a604352403)), closes [#425](https://github.com/AmerMathSoc/ams-xml-to-html/issues/425)

### [13.7.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.7.0...v13.7.1) (2023-09-13)


### Bug Fixes

* **x.js:** drop x in xref-group ([90cf722](https://github.com/AmerMathSoc/ams-xml-to-html/commit/90cf72242d5a329cd7eae84c48fab706df64a074)), closes [#431](https://github.com/AmerMathSoc/ams-xml-to-html/issues/431)
* **xref-group:** reduce data-ams-refrange value ([e6ad0b8](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e6ad0b82141cd884f6cee91f9da68a97b7d9b945)), closes [#431](https://github.com/AmerMathSoc/ams-xml-to-html/issues/431)

## [13.7.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.6.0...v13.7.0) (2023-09-12)


### Features

* support xref-group element ([42aa5e4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/42aa5e4232504c3578477127dc95cadfb30ecd4f)), closes [#428](https://github.com/AmerMathSoc/ams-xml-to-html/issues/428)


### Bug Fixes

* **xref.js:** remove deprecated ref-label handling ([4da69c3](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4da69c39d51d15cad31a7becdaf39f59776b5bcc)), closes [#427](https://github.com/AmerMathSoc/ams-xml-to-html/issues/427)

## [13.6.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.5.1...v13.6.0) (2023-08-09)


### Features

* support related-article ([ad0887a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ad0887aed264e1af3af765794350d8a56f583dd9)), closes [#279](https://github.com/AmerMathSoc/ams-xml-to-html/issues/279)

### [13.5.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.5.0...v13.5.1) (2023-08-08)


### Bug Fixes

* adjust to texml changes for "text equations" ([f6910d9](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f6910d9a545559bba64c246d7776ae5d8a6cabc8)), closes [#426](https://github.com/AmerMathSoc/ams-xml-to-html/issues/426)

## [13.5.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.4.0...v13.5.0) (2023-06-29)


### Features

* support tag element ([809b72b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/809b72b476e8dfb6c92680bb5d79b4adf8b0e03e)), closes [#423](https://github.com/AmerMathSoc/ams-xml-to-html/issues/423)

## [13.4.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.3.2...v13.4.0) (2023-06-27)


### Features

* **target.js:** heuristics tag extraction ([b901e6a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b901e6a16625a1a64e462c33361376b858525098)), closes [#401](https://github.com/AmerMathSoc/ams-xml-to-html/issues/401)


### Bug Fixes

* replace nyc with c8 ([7219c83](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7219c8354dc215eeb1c54ef724ab83d1c059fc31)), closes [#421](https://github.com/AmerMathSoc/ams-xml-to-html/issues/421)

### [13.3.2](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.3.1...v13.3.2) (2023-05-08)

### [13.3.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.3.0...v13.3.1) (2023-03-28)


### Bug Fixes

* **fn.js:** aria-label for footnotes ([0ed94bf](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0ed94bf4498840f3ddea6699b5af060d57597daf)), closes [#415](https://github.com/AmerMathSoc/ams-xml-to-html/issues/415)

## [13.3.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.2.0...v13.3.0) (2023-03-17)


### Features

* disp-formula with content-type="text" ([060b1f1](https://github.com/AmerMathSoc/ams-xml-to-html/commit/060b1f1a43a06168c4402560edd7e03148c78b33)), closes [#413](https://github.com/AmerMathSoc/ams-xml-to-html/issues/413)

## [13.2.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.1.0...v13.2.0) (2023-02-22)


### Features

* **article-metadata-json.js:** preserve vocab-identifier ([ed9ff61](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ed9ff61ebb297b3bc284efcea9e44dea2adcaf91)), closes [#412](https://github.com/AmerMathSoc/ams-xml-to-html/issues/412)

## [13.1.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.0.1...v13.1.0) (2023-02-13)


### Features

* generate byline for article- and sec-meta ([97b1a93](https://github.com/AmerMathSoc/ams-xml-to-html/commit/97b1a93e4514d5c0b29f9e21ecbae915fdbf03e4)), closes [#409](https://github.com/AmerMathSoc/ams-xml-to-html/issues/409)
* **metadata:** add identifier for AMS "manid" ([4759519](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4759519ba3264111f9198cde71c1307191f0b219)), closes [#406](https://github.com/AmerMathSoc/ams-xml-to-html/issues/406)


### Bug Fixes

* **article-metadata-json.js:** improve self-uri ([f780b79](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f780b79ae2e9ea611565e752666b41eb63a561c2)), closes [#404](https://github.com/AmerMathSoc/ams-xml-to-html/issues/404)
* **extractContribGroups.js:** handle groups of same type ([2b777ae](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2b777ae2beb905c6e62534b2860ec7e9b764fdbf)), closes [#408](https://github.com/AmerMathSoc/ams-xml-to-html/issues/408)

### [13.0.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v13.0.0...v13.0.1) (2023-01-27)


### Bug Fixes

* **mixed-citation:** drop deprecated role ([a894343](https://github.com/AmerMathSoc/ams-xml-to-html/commit/a894343947e3974087890ca0c922509e1dacd36f)), closes [#407](https://github.com/AmerMathSoc/ams-xml-to-html/issues/407)

## [13.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v12.0.0...v13.0.0) (2023-01-19)


### ⚠ BREAKING CHANGES

* Less markup in book metadata json blob, see #405.
* Overhaul of article metadata #254. Drops titlepage and copyright-page, introduces metadata as json blob.

### Features

* revise article metadata processing ([4c49d20](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4c49d20ac906c60fb664c64c0de5e3c5a6935357)), closes [#254](https://github.com/AmerMathSoc/ams-xml-to-html/issues/254)
* revise book metadata handling ([6a5b850](https://github.com/AmerMathSoc/ams-xml-to-html/commit/6a5b85045ac5b02cf8567c0e727e8a8a9de67eca)), closes [#254](https://github.com/AmerMathSoc/ams-xml-to-html/issues/254) [#405](https://github.com/AmerMathSoc/ams-xml-to-html/issues/405)


### Bug Fixes

* **secheading.js:** revise level calculation ([75add67](https://github.com/AmerMathSoc/ams-xml-to-html/commit/75add67838b057fe22622ce17277be59df8b4cc2)), closes [#403](https://github.com/AmerMathSoc/ams-xml-to-html/issues/403)
* **statement.js:** drop data-ams-doc-level ([85e64c7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/85e64c71d3a1efdb4c343ea8933b7986cbbfc787)), closes [#403](https://github.com/AmerMathSoc/ams-xml-to-html/issues/403) [#397](https://github.com/AmerMathSoc/ams-xml-to-html/issues/397)

## [12.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v11.0.0...v12.0.0) (2022-12-21)


### ⚠ BREAKING CHANGES

* Removes support for deprecated MSC markup #386

### Features

* remove support for deprecated markup ([c7affa9](https://github.com/AmerMathSoc/ams-xml-to-html/commit/c7affa9eab717f678f41ccaeb369712d66c198bf)), closes [#386](https://github.com/AmerMathSoc/ams-xml-to-html/issues/386)
* **sec-heading.js:** integrate mapAttributes() ([e1481d0](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e1481d0a3530d6259e84b0fd02424ba22a99f38d)), closes [#354](https://github.com/AmerMathSoc/ams-xml-to-html/issues/354)
* **secheading.js:** add data-ams-doc-level ([8f92d86](https://github.com/AmerMathSoc/ams-xml-to-html/commit/8f92d8661cd376d53ab87100bfc1c43d58238da3)), closes [#322](https://github.com/AmerMathSoc/ams-xml-to-html/issues/322)
* **xref:** preserve ref-label attribute ([139c473](https://github.com/AmerMathSoc/ams-xml-to-html/commit/139c473bf9e4a01de0d88bcd05a435a201d9c21b)), closes [#272](https://github.com/AmerMathSoc/ams-xml-to-html/issues/272)


### Bug Fixes

* remove duplicate viewport meta tag for books ([7550472](https://github.com/AmerMathSoc/ams-xml-to-html/commit/75504724b1e4548c769ce37dc838cf92be5a265b)), closes [#402](https://github.com/AmerMathSoc/ams-xml-to-html/issues/402)

## [11.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.15.1...v11.0.0) (2022-11-22)


### ⚠ BREAKING CHANGES

* No longer supports fs.read buffers // needs toString().

### Features

* upgrade linkedom@0.14.20 ([90f88de](https://github.com/AmerMathSoc/ams-xml-to-html/commit/90f88de74d375626d367826e28ab54903823d4c9)), closes [#394](https://github.com/AmerMathSoc/ams-xml-to-html/issues/394)

### [10.15.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.15.0...v10.15.1) (2022-11-18)


### Bug Fixes

* **mapColorAttributes:** map border attributes ([a162a04](https://github.com/AmerMathSoc/ams-xml-to-html/commit/a162a0407a05c4ffdd6d014821b40e917700b13e)), closes [#394](https://github.com/AmerMathSoc/ams-xml-to-html/issues/394)

## [10.15.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.14.0...v10.15.0) (2022-10-31)


### Features

* support table-wrap-group ([ae9f47b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ae9f47b61c6a45553b6e3ce3dd3ec12f7075b417)), closes [#393](https://github.com/AmerMathSoc/ams-xml-to-html/issues/393)

## [10.14.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.13.1...v10.14.0) (2022-10-26)


### Features

* revise setHead() ([f565d9c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f565d9c5c71554a2fb20781176ed5398d2d657bc)), closes [#391](https://github.com/AmerMathSoc/ams-xml-to-html/issues/391)

### [10.13.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.13.0...v10.13.1) (2022-10-24)


### Bug Fixes

* **target.js:** don't escape text inside tex-math ([efc8a83](https://github.com/AmerMathSoc/ams-xml-to-html/commit/efc8a83ff36c9ad4408392b1f25b8bdfe65144dd)), closes [#392](https://github.com/AmerMathSoc/ams-xml-to-html/issues/392)

## [10.13.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.12.0...v10.13.0) (2022-09-22)


### Features

* **hacks.js:** remove empty paragraphs ([98dd2af](https://github.com/AmerMathSoc/ams-xml-to-html/commit/98dd2af6b1c46a849a06782755e0fa8f5fa3f349)), closes [#388](https://github.com/AmerMathSoc/ams-xml-to-html/issues/388)


### Bug Fixes

* regressions due to table-wrap adoption ([fd3d321](https://github.com/AmerMathSoc/ams-xml-to-html/commit/fd3d321474f9432cf0df4a16d7a65196a4cd4828)), closes [#382](https://github.com/AmerMathSoc/ams-xml-to-html/issues/382) [#389](https://github.com/AmerMathSoc/ams-xml-to-html/issues/389)

## [10.12.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.11.1...v10.12.0) (2022-09-16)


### Features

* **journal-meta:** adjust to texml change ([2ebf40b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2ebf40b0aef7606f6a1fe141d272352f9bafad2c)), closes [#386](https://github.com/AmerMathSoc/ams-xml-to-html/issues/386) [#382](https://github.com/AmerMathSoc/ams-xml-to-html/issues/382)
* support new MSC markup ([5058da4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5058da4ddb2bcb9417e60ef2b85d4ddb4c98f700)), closes [#386](https://github.com/AmerMathSoc/ams-xml-to-html/issues/386) [#382](https://github.com/AmerMathSoc/ams-xml-to-html/issues/382)
* support private-char ([2484923](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2484923c98d90534679fb9b6db724aec2daf7812)), closes [#386](https://github.com/AmerMathSoc/ams-xml-to-html/issues/386) [#382](https://github.com/AmerMathSoc/ams-xml-to-html/issues/382)
* support target inside tex-math ([bc69a59](https://github.com/AmerMathSoc/ams-xml-to-html/commit/bc69a59ef55ffae2690da2c385045e11e69f96db)), closes [#386](https://github.com/AmerMathSoc/ams-xml-to-html/issues/386) [#382](https://github.com/AmerMathSoc/ams-xml-to-html/issues/382)
* **table-wrap:** adjust to texml change ([7bdc46c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7bdc46c17be14c590cf824d9b460436b3a31715a)), closes [#386](https://github.com/AmerMathSoc/ams-xml-to-html/issues/386) [#382](https://github.com/AmerMathSoc/ams-xml-to-html/issues/382)

### [10.11.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.11.0...v10.11.1) (2022-09-09)


### Bug Fixes

* **article.js:** check pubid and manid separately ([ddb819f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ddb819f31f0a6a867c901f63a77afdd84cdfcf6e)), closes [#384](https://github.com/AmerMathSoc/ams-xml-to-html/issues/384)

## [10.11.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.10.1...v10.11.0) (2022-09-09)


### Features

* **article.js:** keep manid / pubid separate ([0d5cb17](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0d5cb1707805e0bb1c09e99278c1342e51bbdc11)), closes [#383](https://github.com/AmerMathSoc/ams-xml-to-html/issues/383)

### [10.10.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.10.0...v10.10.1) (2022-08-17)


### Bug Fixes

* **formula.js:** nested formula handling ([fbd5861](https://github.com/AmerMathSoc/ams-xml-to-html/commit/fbd5861ac406ddb9cc72d34f76d752dff6886121)), closes [#378](https://github.com/AmerMathSoc/ams-xml-to-html/issues/378) [#379](https://github.com/AmerMathSoc/ams-xml-to-html/issues/379)

## [10.10.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.9.0...v10.10.0) (2022-08-17)


### Features

* add hack to workaround flow content in P ([d149afb](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d149afb9985031ea954208ac1082e278db8aa398)), closes [texml#104](https://github.com/AmerMathSoc/texml/issues/104) [#377](https://github.com/AmerMathSoc/ams-xml-to-html/issues/377)


### Bug Fixes

* **formula.js:** nested formula handling ([bd6249b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/bd6249b4977423c7b7ca88367d54bd522c72fb90)), closes [#378](https://github.com/AmerMathSoc/ams-xml-to-html/issues/378)

## [10.9.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.8.0...v10.9.0) (2022-08-02)


### Features

* revise fallback alt text for graphics ([924c2f6](https://github.com/AmerMathSoc/ams-xml-to-html/commit/924c2f61d5fa1f5c9abf30bfadf3eea391ca96e9)), closes [#375](https://github.com/AmerMathSoc/ams-xml-to-html/issues/375)

## [10.8.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.7.3...v10.8.0) (2022-06-29)


### Features

* **graphic.js:** support graphics inside tex-math ([2eca6ba](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2eca6ba4d96d2981f6d2ff1a8ac910209c03a864)), closes [#376](https://github.com/AmerMathSoc/ams-xml-to-html/issues/376)

### [10.7.3](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.7.2...v10.7.3) (2022-06-22)


### Bug Fixes

* **book-meta-json.js:** adjust to texml change ([6e2d56d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/6e2d56dbf3bf12ceffce1108443b76661afb40b6)), closes [#374](https://github.com/AmerMathSoc/ams-xml-to-html/issues/374)

### [10.7.2](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.7.1...v10.7.2) (2022-06-15)


### Bug Fixes

* **graphic.js:** fallback for unitless dimensions ([e5b0d9a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e5b0d9ad38396bc4e40176374eccd2daa55751c9)), closes [#373](https://github.com/AmerMathSoc/ams-xml-to-html/issues/373)

### [10.7.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.7.0...v10.7.1) (2022-05-19)

## [10.7.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.6.3...v10.7.0) (2022-05-12)


### Features

* **mapAttributes.js:** preserve class attribute ([241e006](https://github.com/AmerMathSoc/ams-xml-to-html/commit/241e00676084cd96991f1346f683ba965fb18830)), closes [#371](https://github.com/AmerMathSoc/ams-xml-to-html/issues/371)

### [10.6.3](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.6.2...v10.6.3) (2022-04-29)


### Bug Fixes

* **sc.js:** in tex-math, wrap \mathsc in $...$ ([b36d7e7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b36d7e7c637787ba76814a32460f1ed7869f2372)), closes [#370](https://github.com/AmerMathSoc/ams-xml-to-html/issues/370)

### [10.6.2](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.6.1...v10.6.2) (2022-04-25)


### Bug Fixes

* **book-meta-json.js:** preserve author-comment ([babd06d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/babd06d6911b94d6df0aeaf230c2cea788f7ff22)), closes [#369](https://github.com/AmerMathSoc/ams-xml-to-html/issues/369)

### [10.6.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.6.0...v10.6.1) (2022-04-11)


### Bug Fixes

* **helpers-tex:** escape & in text in TeX ([63b9470](https://github.com/AmerMathSoc/ams-xml-to-html/commit/63b94702a4bce255bfed01637095e97f97b83dc0)), closes [#368](https://github.com/AmerMathSoc/ams-xml-to-html/issues/368)

## [10.6.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.5.4...v10.6.0) (2022-04-01)


### Features

* support alg:* elements ([f85a311](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f85a3112ce06b7126a85d1b394a966087fce7e80)), closes [#40](https://github.com/AmerMathSoc/ams-xml-to-html/issues/40)

### [10.5.4](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.5.3...v10.5.4) (2022-03-20)


### Bug Fixes

* **xref.js:** remove leading space ([80e466b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/80e466bf82bbb8bd02bac5279aeef61b49e405f1)), closes [#365](https://github.com/AmerMathSoc/ams-xml-to-html/issues/365)

### [10.5.3](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.5.2...v10.5.3) (2022-03-18)


### Bug Fixes

* **helpers-tex:** escape `~` ([9b5a9a6](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9b5a9a695fe5ad678f4482a512e9f1a7a2e33321)), closes [#363](https://github.com/AmerMathSoc/ams-xml-to-html/issues/363)

### [10.5.2](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.5.1...v10.5.2) (2022-03-18)


### Bug Fixes

* multiple TeX-escaping issues ([e2d0f60](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e2d0f607c812fe53df66d8540638e73e55dc2f0d)), closes [#363](https://github.com/AmerMathSoc/ams-xml-to-html/issues/363)

### [10.5.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.5.0...v10.5.1) (2022-03-14)


### Bug Fixes

* **roman.js:** replace textup with textrm ([ee33ebb](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ee33ebb00344db55562e47a67733c97ad268cc08)), closes [#362](https://github.com/AmerMathSoc/ams-xml-to-html/issues/362)

## [10.5.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.4.3...v10.5.0) (2022-03-14)


### Features

* support text-styling within tex-math ([115c27a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/115c27a08bab6e55b351914cfd6d6ce38f3c5419)), closes [#359](https://github.com/AmerMathSoc/ams-xml-to-html/issues/359)


### Bug Fixes

* **xref.js:** adjust to up&downstream changes ([fa1e6f0](https://github.com/AmerMathSoc/ams-xml-to-html/commit/fa1e6f07a9203c19a990aec4a1f19c8d7b3e5c42)), closes [#311](https://github.com/AmerMathSoc/ams-xml-to-html/issues/311)

### [10.4.3](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.4.2...v10.4.3) (2022-03-07)


### Bug Fixes

*  upgrade linkedom ([4cb4091](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4cb4091947a3b9f5ab8d4744bd5786986759226d))

### [10.4.2](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.4.1...v10.4.2) (2022-03-02)


### Bug Fixes

* revise wrapping $ handling ([1441ec8](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1441ec866524a782c80cf13ec6afb3b175f7be62)), closes [#358](https://github.com/AmerMathSoc/ams-xml-to-html/issues/358)

### [10.4.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.4.0...v10.4.1) (2022-03-02)


### Bug Fixes

* handle nested inline-formula elements ([77f0a64](https://github.com/AmerMathSoc/ams-xml-to-html/commit/77f0a64fa1c8aa241a8ece71cbaaae3462b18ab7)), closes [#356](https://github.com/AmerMathSoc/ams-xml-to-html/issues/356) [#357](https://github.com/AmerMathSoc/ams-xml-to-html/issues/357)

## [10.4.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.3.0...v10.4.0) (2022-03-02)


### Features

* **text.js:** support tex-math inside text ([be0969a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/be0969aae16d8caf4265b783d428a9ea17b33b43)), closes [#356](https://github.com/AmerMathSoc/ams-xml-to-html/issues/356) [#340](https://github.com/AmerMathSoc/ams-xml-to-html/issues/340)

## [10.3.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.2.0...v10.3.0) (2022-03-01)


### Features

* **book-meta-json.js:** support collection metadata ([cce9739](https://github.com/AmerMathSoc/ams-xml-to-html/commit/cce9739bbdde18a5795b14415127d4cc19c6ca4c)), closes [#353](https://github.com/AmerMathSoc/ams-xml-to-html/issues/353)

## [10.2.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.1.1...v10.2.0) (2022-02-17)


### Features

* support subj-group & subject ([ce8ff45](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ce8ff45a851ceaca22cdfbb80a266e68d26e07b1)), closes [#355](https://github.com/AmerMathSoc/ams-xml-to-html/issues/355)

### [10.1.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.1.0...v10.1.1) (2022-02-11)


### Bug Fixes

* **fn.js:** multiple footnotes in ancestor ([cb77f1d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/cb77f1db5959e908514255b81cb54ce407d7dbde)), closes [#352](https://github.com/AmerMathSoc/ams-xml-to-html/issues/352)

## [10.1.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.0.0...v10.1.0) (2022-02-10)


### Features

* support article subtitle ([f7eafec](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f7eafec889a5a81fe3c8eb230b04ac400aafc744)), closes [#351](https://github.com/AmerMathSoc/ams-xml-to-html/issues/351)


### Bug Fixes

* **mapColorAttributes:** default border width ([8b0ac9c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/8b0ac9cfb6c839c8ee4fc42b4f5905643641e4fd)), closes [#346](https://github.com/AmerMathSoc/ams-xml-to-html/issues/346)

## [10.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v10.0.0-0...v10.0.0) (2022-02-04)


### Bug Fixes

* **text.js:** re-escape # ([f2a69cc](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f2a69ccce74b24c02d9b39e8133d6f6c72ce4b06)), closes [#345](https://github.com/AmerMathSoc/ams-xml-to-html/issues/345)

## [10.0.0-0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v9.0.1...v10.0.0-0) (2022-01-26)


### ⚠ BREAKING CHANGES

* remove (broken) CLI mode
* book metadata output is now a JSON blob.

### Features

* redesign book metadata ([3864eb9](https://github.com/AmerMathSoc/ams-xml-to-html/commit/3864eb9f84a81229c919700fd320bb08bbb3912b)), closes [#254](https://github.com/AmerMathSoc/ams-xml-to-html/issues/254)


### Bug Fixes

* unnest links within ext-link ([14f7426](https://github.com/AmerMathSoc/ams-xml-to-html/commit/14f742653939da6628552b72f259ba62898bd38b)), closes [#347](https://github.com/AmerMathSoc/ams-xml-to-html/issues/347)


* fix!(ams-xml-to-html.js): remove (broken) CLI mode ([e26e967](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e26e96788cbc716713325d4f3b70f967697f4dbd))

### [9.0.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v9.0.0...v9.0.1) (2022-01-17)


### Bug Fixes

* **footnote:** wrap footnote marker in superscript ([9962791](https://github.com/AmerMathSoc/ams-xml-to-html/commit/99627918725cd7aad3991787c4e00229ce400ada)), closes [#344](https://github.com/AmerMathSoc/ams-xml-to-html/issues/344)

## [9.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.10.0...v9.0.0) (2022-01-13)


### ⚠ BREAKING CHANGES

* footnote no longer drops its label.
* foonotes now `div` (instead of `span`) and moved out of ancestors.

### Features

* revise footnote handling ([46483d4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/46483d4e383aa60fe5993811b95edb3ddcee678b)), closes [#336](https://github.com/AmerMathSoc/ams-xml-to-html/issues/336)


### Bug Fixes

* **label.js:** for ref, remove wrapping span ([1b2c9db](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1b2c9db7ce62d283b90a1fafc3fc9e7c571d7813)), closes [#343](https://github.com/AmerMathSoc/ams-xml-to-html/issues/343)


* feat!(label.js): preserve label in fn ([6b956f5](https://github.com/AmerMathSoc/ams-xml-to-html/commit/6b956f5b4b426a886a39996eb1182713da1e387a)), closes [#342](https://github.com/AmerMathSoc/ams-xml-to-html/issues/342)

## [8.10.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.9.1...v8.10.0) (2022-01-10)


### Features

* **fig:** improve attribute preservation ([04b1947](https://github.com/AmerMathSoc/ams-xml-to-html/commit/04b194756dd05098332d378b1311fc1f01441831)), closes [#339](https://github.com/AmerMathSoc/ams-xml-to-html/issues/339)

### [8.9.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.9.0...v8.9.1) (2021-12-17)

## [8.9.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.8.0...v8.9.0) (2021-12-10)


### Features

* handle xref and ext-link inside xref ([13489f7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/13489f76aa9cc045995a6d039302d4b583408142)), closes [#332](https://github.com/AmerMathSoc/ams-xml-to-html/issues/332)

## [8.8.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.7.0...v8.8.0) (2021-12-06)


### Features

* support tcolorbox output ([e187228](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e187228946d3b29dc3bcb5aee5c65bbbeccd1ffd)), closes [#334](https://github.com/AmerMathSoc/ams-xml-to-html/issues/334)

## [8.7.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.6.0...v8.7.0) (2021-12-03)


### Features

* **sec-meta:** improve support in articles ([7d02f14](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7d02f1479461ba633015bde17d53f929fea4bcc3)), closes [#335](https://github.com/AmerMathSoc/ams-xml-to-html/issues/335)

## [8.6.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.5.0...v8.6.0) (2021-11-18)


### Features

* **styled-content:** support color attributes ([8cb0656](https://github.com/AmerMathSoc/ams-xml-to-html/commit/8cb0656cf83ced2ccb994823086f6bed3febd9b5)), closes [#333](https://github.com/AmerMathSoc/ams-xml-to-html/issues/333)

## [8.5.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.4.0...v8.5.0) (2021-11-17)


### Features

* **ref-list.js:** support nested ref-list ([fa6f4b9](https://github.com/AmerMathSoc/ams-xml-to-html/commit/fa6f4b9c5d5d7a6dee939dfd528d1fca11ab2e83)), closes [#331](https://github.com/AmerMathSoc/ams-xml-to-html/issues/331)


### Bug Fixes

* **fig.js:** drop explicit role ([bb4fe4c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/bb4fe4cad37586ba72efcc2ebc240c339f255532)), closes [#325](https://github.com/AmerMathSoc/ams-xml-to-html/issues/325)

## [8.4.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.3.1...v8.4.0) (2021-11-09)


### Features

* **label.js:** check for trailing period ([1f85fa4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1f85fa4531c2c895a5a604a69739d068aaec5fe5)), closes [#310](https://github.com/AmerMathSoc/ams-xml-to-html/issues/310)

### [8.3.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.3.0...v8.3.1) (2021-11-09)


### Bug Fixes

* support all <notes> in articles ([8aed454](https://github.com/AmerMathSoc/ams-xml-to-html/commit/8aed45453f08c499f51b82cad436ade486cba309)), closes [#329](https://github.com/AmerMathSoc/ams-xml-to-html/issues/329)
* **contrib:** check suffix for leading comma ([bffb948](https://github.com/AmerMathSoc/ams-xml-to-html/commit/bffb948005bceaa7fcc1feed023b3626f9bae0bc)), closes [#330](https://github.com/AmerMathSoc/ams-xml-to-html/issues/330)

## [8.3.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.2.0...v8.3.0) (2021-10-29)


### Features

* support multiple custom-meta elements ([65f7ac9](https://github.com/AmerMathSoc/ams-xml-to-html/commit/65f7ac9637dd2459097cc67a33b1ecd316734e51)), closes [#324](https://github.com/AmerMathSoc/ams-xml-to-html/issues/324)

## [8.2.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.1.1...v8.2.0) (2021-10-26)


### Features

* **sec.js:** support refhead ([1ba27d4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1ba27d4086c3b2e512769a78436c61543d9ce59b)), closes [#328](https://github.com/AmerMathSoc/ams-xml-to-html/issues/328)

### [8.1.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.1.0...v8.1.1) (2021-10-01)

## [8.1.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.0.0...v8.1.0) (2021-09-30)


### Features

* support <bio> ([5d1edb7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5d1edb79a67f1053e3d58319131b9b0023967bab)), closes [#323](https://github.com/AmerMathSoc/ams-xml-to-html/issues/323)

## [8.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v8.0.0-0...v8.0.0) (2021-09-29)

## [8.0.0-0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v7.5.0...v8.0.0-0) (2021-08-20)


### ⚠ BREAKING CHANGES

* Switch from jsdom to linkedom #319
* ams-xml-to-html will no longer run via npx

### Features

* remove ability to call via npx ([46dfb12](https://github.com/AmerMathSoc/ams-xml-to-html/commit/46dfb12a969cc0c5e3e258b0a09bde5f746d28a0)), closes [#320](https://github.com/AmerMathSoc/ams-xml-to-html/issues/320)
* replace jsdom with linkedom ([d18a8ef](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d18a8efd8ac8b042e2da32127ed15157b996d340)), closes [#319](https://github.com/AmerMathSoc/ams-xml-to-html/issues/319)

## [7.5.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v7.4.0...v7.5.0) (2021-04-15)


### Features

* **article-id:** add MR number to MR link ([23799fa](https://github.com/AmerMathSoc/ams-xml-to-html/commit/23799fab9d1d7c817100bd5bffbfc077495f86ef)), closes [#316](https://github.com/AmerMathSoc/ams-xml-to-html/issues/316)

## [7.4.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v7.3.0...v7.4.0) (2021-02-25)


### Features

* support simpletabbing, line ([347b2f1](https://github.com/AmerMathSoc/ams-xml-to-html/commit/347b2f1f11345fee245f8bd194b4968526a31414)), closes [#315](https://github.com/AmerMathSoc/ams-xml-to-html/issues/315)

## [7.3.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v7.2.0...v7.3.0) (2021-02-18)


### Features

* **toc-entry.js:** revise alt-title handling ([7152007](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7152007cfa0c20fd8d6d9d1b9139727c9e9dc7c3)), closes [#314](https://github.com/AmerMathSoc/ams-xml-to-html/issues/314)


### Bug Fixes

* **toc-entry:** fix check for contribs. ([9657a1c](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9657a1c9732f01d1da7f0bcfdf2e1bf45a19cc93))

## [7.2.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v7.1.0...v7.2.0) (2021-02-17)


### Features

* **app.js:** add heuristics for acknowledgments ([d85f161](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d85f1617d4638bd4f851cd886973dbfed5d1ad52)), closes [#262](https://github.com/AmerMathSoc/ams-xml-to-html/issues/262)
* **toc-entry:** support contributor info ([97f64cd](https://github.com/AmerMathSoc/ams-xml-to-html/commit/97f64cd2061198f29e2749776f59989a4c3f022d)), closes [#312](https://github.com/AmerMathSoc/ams-xml-to-html/issues/312)

## [7.1.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v7.0.0...v7.1.0) (2020-12-14)


### Features

* support disp-formula-group ([7147ce3](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7147ce33056845ded4c42ba38c953ab4782c971d)), closes [#309](https://github.com/AmerMathSoc/ams-xml-to-html/issues/309)

## [7.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.10.0...v7.0.0) (2020-11-24)


### ⚠ BREAKING CHANGES

* statement output changed from section to figure tags #222

### Features

* revise statement handling ([a613ab0](https://github.com/AmerMathSoc/ams-xml-to-html/commit/a613ab0854efc602c5132d23e2aa97a2d7ff892b)), closes [#222](https://github.com/AmerMathSoc/ams-xml-to-html/issues/222)

## [6.10.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.9.0...v6.10.0) (2020-11-10)


### Features

* revise underline handling ([944f76d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/944f76d2618309c80fd831e6980746bda03f9794)), closes [#223](https://github.com/AmerMathSoc/ams-xml-to-html/issues/223)

## [6.9.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.8.0...v6.9.0) (2020-09-25)


### Features

* **article.js:** add data-ams-manid to titlepage ([99c3994](https://github.com/AmerMathSoc/ams-xml-to-html/commit/99c39947f3278321de3cbc9714e08bda5a572a8a)), closes [#269](https://github.com/AmerMathSoc/ams-xml-to-html/issues/269)

## [6.8.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.7.0...v6.8.0) (2020-09-22)


### Features

* **def-item:** always add wrapping div ([7948e3a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7948e3a4bf72fdf7ad3825c72dd904cd12f245de)), closes [#307](https://github.com/AmerMathSoc/ams-xml-to-html/issues/307)

## [6.7.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.6.1...v6.7.0) (2020-09-18)


### Features

* add table wrapper ([a550218](https://github.com/AmerMathSoc/ams-xml-to-html/commit/a5502189f776cd13f069c6bb49f4e2d76ef4cf8a)), closes [#306](https://github.com/AmerMathSoc/ams-xml-to-html/issues/306)

### [6.6.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.6.0...v6.6.1) (2020-08-25)


### Bug Fixes

* **contrib.js:** preserve <suffix> ([3aa3ab3](https://github.com/AmerMathSoc/ams-xml-to-html/commit/3aa3ab3afe210582ab949b4841387c0db7ccdd81)), closes [#305](https://github.com/AmerMathSoc/ams-xml-to-html/issues/305)

## [6.6.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.5.1...v6.6.0) (2020-08-24)


### Features

* **label.js:** separate label and title ([0c118ca](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0c118ca02f2d0127c93f49c2944601ce6e80f1f6)), closes [#303](https://github.com/AmerMathSoc/ams-xml-to-html/issues/303)

### [6.5.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.5.0...v6.5.1) (2020-08-21)


### Bug Fixes

* **disp-quote:** epigraphs use content-type ([e673526](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e673526c64e7ad6e75d01ba38f7de3597a8c0492)), closes [#304](https://github.com/AmerMathSoc/ams-xml-to-html/issues/304)

## [6.5.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.4.1...v6.5.0) (2020-08-21)


### Features

* **disp-quote:** add role for epigraphs ([2152d70](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2152d70c65ef1377229116e028056560980ccbf2)), closes [#245](https://github.com/AmerMathSoc/ams-xml-to-html/issues/245)

### [6.4.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.4.0...v6.4.1) (2020-07-29)


### Bug Fixes

* **pub-date.js:** handle missing received date ([5bf6c0a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5bf6c0a305f43844f1c8b13b983a8575cbcbfda8)), closes [#301](https://github.com/AmerMathSoc/ams-xml-to-html/issues/301)

## [6.4.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.3.1...v6.4.0) (2020-07-02)


### Features

* **toc.js:** preserve id ([e7d315d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e7d315d7beeb2c17abb578321870efb393f1ffa9)), closes [#298](https://github.com/AmerMathSoc/ams-xml-to-html/issues/298)

### [6.3.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.3.0...v6.3.1) (2020-07-01)


### Bug Fixes

* **toc-entry:** fix check for empty label ([0eac3d5](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0eac3d5c3248e2a076591b7326b48e336261e25d)), closes [#299](https://github.com/AmerMathSoc/ams-xml-to-html/issues/299)
* **toc-entry:** work around :scope bug ([868a9c4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/868a9c4f12e05ce2e7796e2096a7ba06724dcd23)), closes [#300](https://github.com/AmerMathSoc/ams-xml-to-html/issues/300)
* update test/element-articles.js ([e688f2a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e688f2a06e04117ce2c7576031ef2dbb3bb78564)), closes [#297](https://github.com/AmerMathSoc/ams-xml-to-html/issues/297)

## [6.3.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.2.0...v6.3.0) (2020-06-29)


### Features

* support notes element (generally) ([e1234a7](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e1234a7c87fabda9b116af2cf6e207146dac5325)), closes [#283](https://github.com/AmerMathSoc/ams-xml-to-html/issues/283) [#297](https://github.com/AmerMathSoc/ams-xml-to-html/issues/297)

## [6.2.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.1.1...v6.2.0) (2020-06-23)


### Features

* map specific-use="part" to  role="doc-part" ([1bdb4a4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1bdb4a48c272a10c25278ecf871976b4d984b858)), closes [#296](https://github.com/AmerMathSoc/ams-xml-to-html/issues/296)
* support book-app-group, book-app ([54ef045](https://github.com/AmerMathSoc/ams-xml-to-html/commit/54ef0455547ed3ce9a470e6e55bf17a148f5bb0e)), closes [#280](https://github.com/AmerMathSoc/ams-xml-to-html/issues/280)

### [6.1.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.1.0...v6.1.1) (2020-06-22)


### Bug Fixes

* **xref.js:** tex-math/text/xref needs \text{} ([4ac0b4e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4ac0b4ea8aab282ae4789c2bad029554108b9e8e)), closes [#295](https://github.com/AmerMathSoc/ams-xml-to-html/issues/295)

## [6.1.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.0.2...v6.1.0) (2020-06-18)


### Features

* support boxed-text ([012fb9e](https://github.com/AmerMathSoc/ams-xml-to-html/commit/012fb9e73ad7ace7acb2aefbabc5a14dd3b89231)), closes [#294](https://github.com/AmerMathSoc/ams-xml-to-html/issues/294)

### [6.0.2](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.0.1...v6.0.2) (2020-04-01)


### Bug Fixes

* don't throw on (some) missing metadata ([2c47fe5](https://github.com/AmerMathSoc/ams-xml-to-html/commit/2c47fe5143f83837fda1fa016219a85bc45a9c35)), closes [#291](https://github.com/AmerMathSoc/ams-xml-to-html/issues/291)

### [6.0.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v6.0.0...v6.0.1) (2020-03-24)


### Bug Fixes

* **label.js:** data-ams-doc-alttitle should include label content ([4723367](https://github.com/AmerMathSoc/ams-xml-to-html/commit/472336717e71e6f72a704f52262b1d06a22d1839)), closes [#290](https://github.com/AmerMathSoc/ams-xml-to-html/issues/290)

## [6.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.2.0...v6.0.0) (2020-03-24)


### ⚠ BREAKING CHANGES

* removes XSL implementation

### Features

* support lang attribute on document root ([32691b8](https://github.com/AmerMathSoc/ams-xml-to-html/commit/32691b836d468aad6787ff4626a1052dc0411f51)), closes [#288](https://github.com/AmerMathSoc/ams-xml-to-html/issues/288)
* support sans-serif elements ([ee8265d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ee8265dc00872fd3c5ab69eb7007fdb7a00ab1c5)), closes [#285](https://github.com/AmerMathSoc/ams-xml-to-html/issues/285)
* **label.js:** preserve alt-title in books ([baaf62f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/baaf62ff8871df1c74ee6124baf7f37a724ab14f)), closes [#287](https://github.com/AmerMathSoc/ams-xml-to-html/issues/287)
* **toc-entry.js:** use alt-title in TOC ([5fa007f](https://github.com/AmerMathSoc/ams-xml-to-html/commit/5fa007fe76290bc340d97a49a44e6ea5caac7ffd)), closes [#284](https://github.com/AmerMathSoc/ams-xml-to-html/issues/284)
* remove XSL ([ee82700](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ee82700f938197406d884c54ce0a462fa7b1d134)), closes [#266](https://github.com/AmerMathSoc/ams-xml-to-html/issues/266)

## [5.2.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.1.0...v5.2.0) (2020-02-25)


### Features

* **contrib.js:** support string-name ([d3436e6](https://github.com/AmerMathSoc/ams-xml-to-html/commit/d3436e6)), closes [#281](https://github.com/AmerMathSoc/ams-xml-to-html/issues/281)



## [5.1.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.9...v5.1.0) (2020-02-19)


### Features

* enable ams-xml-to-html.jsas main module ([e32ff13](https://github.com/AmerMathSoc/ams-xml-to-html/commit/e32ff13)), closes [#282](https://github.com/AmerMathSoc/ams-xml-to-html/issues/282)



### [5.0.9](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.8...v5.0.9) (2020-02-06)


### Bug Fixes

* **fig.js:** check id before assigning ([df4ba0d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/df4ba0d)), closes [#278](https://github.com/AmerMathSoc/ams-xml-to-html/issues/278)



### [5.0.8](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.7...v5.0.8) (2020-02-06)


### Bug Fixes

* **book-meta.js:** process all contrib-groups ([7cf1a83](https://github.com/AmerMathSoc/ams-xml-to-html/commit/7cf1a83)), closes [#276](https://github.com/AmerMathSoc/ams-xml-to-html/issues/276)
* **contrib.js:** ensure DT gets at least 1 DD ([be8f60b](https://github.com/AmerMathSoc/ams-xml-to-html/commit/be8f60b)), closes [#277](https://github.com/AmerMathSoc/ams-xml-to-html/issues/277)
* **subtitle.js:** add level when in header ([f55ac29](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f55ac29)), closes [#275](https://github.com/AmerMathSoc/ams-xml-to-html/issues/275)



### [5.0.7](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.6...v5.0.7) (2020-02-06)


### Bug Fixes

* **label.js:** call trim correctly ([b1c4fbc](https://github.com/AmerMathSoc/ams-xml-to-html/commit/b1c4fbc)), closes [#273](https://github.com/AmerMathSoc/ams-xml-to-html/issues/273)
* **xref.js:** pass-trough inside toc-entry ([f68509a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/f68509a)), closes [#271](https://github.com/AmerMathSoc/ams-xml-to-html/issues/271)



### [5.0.6](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.5...v5.0.6) (2020-02-05)


### Bug Fixes

* preserve hr ([ae40fc4](https://github.com/AmerMathSoc/ams-xml-to-html/commit/ae40fc4)), closes [#270](https://github.com/AmerMathSoc/ams-xml-to-html/issues/270)



### [5.0.5](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.4...v5.0.5) (2020-02-05)


### Bug Fixes

* **ams-xml-to-html.js:** set lang=en on html ([bff4307](https://github.com/AmerMathSoc/ams-xml-to-html/commit/bff4307)), closes [#268](https://github.com/AmerMathSoc/ams-xml-to-html/issues/268)



### [5.0.4](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.3...v5.0.4) (2020-02-04)


### Bug Fixes

* **JS:** handle missing volume/issue ([1884e2d](https://github.com/AmerMathSoc/ams-xml-to-html/commit/1884e2d)), closes [#267](https://github.com/AmerMathSoc/ams-xml-to-html/issues/267)



### [5.0.3](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.2...v5.0.3) (2020-02-03)


### Bug Fixes

* **ams-xml-to-html.js:** add #!/usr/bin/env node ([eb1c36a](https://github.com/AmerMathSoc/ams-xml-to-html/commit/eb1c36a)), closes [#265](https://github.com/AmerMathSoc/ams-xml-to-html/issues/265)



### [5.0.2](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.1...v5.0.2) (2020-02-03)


### Bug Fixes

* enable "main" field (and npx) ([62502bd](https://github.com/AmerMathSoc/ams-xml-to-html/commit/62502bd)), closes [#264](https://github.com/AmerMathSoc/ams-xml-to-html/issues/264)



### [5.0.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.0...v5.0.1) (2020-02-03)


### Bug Fixes

* **package.json:** set "bin": "ams-xml-to-html.js" ([9aa9b42](https://github.com/AmerMathSoc/ams-xml-to-html/commit/9aa9b42)), closes [#263](https://github.com/AmerMathSoc/ams-xml-to-html/issues/263)



## [5.0.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v5.0.0-0...v5.0.0) (2020-02-03)



## [5.0.0-0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v4.1.3...v5.0.0-0) (2020-01-30)


### Features

* revise appendix handling ([597ae25](https://github.com/AmerMathSoc/ams-xml-to-html/commit/597ae25)), closes [#260](https://github.com/AmerMathSoc/ams-xml-to-html/issues/260)


### BREAKING CHANGES

* in journals, changes section nesting for app-group+app



### [4.1.3](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v4.1.2...v4.1.3) (2020-01-16)


### Bug Fixes

* **preface.js:** preserve attributes ([0b60924](https://github.com/AmerMathSoc/ams-xml-to-html/commit/0b60924)), closes [#258](https://github.com/AmerMathSoc/ams-xml-to-html/issues/258)
* **statement.js:** ensure valid level ([57cfa22](https://github.com/AmerMathSoc/ams-xml-to-html/commit/57cfa22)), closes [#257](https://github.com/AmerMathSoc/ams-xml-to-html/issues/257)



### [4.1.2](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v4.1.1...v4.1.2) (2020-01-16)


### Bug Fixes

* support ref without label ([8234571](https://github.com/AmerMathSoc/ams-xml-to-html/commit/8234571)), closes [#256](https://github.com/AmerMathSoc/ams-xml-to-html/issues/256)



### [4.1.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v4.1.0...v4.1.1) (2020-01-15)



## [4.1.0](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v4.0.1...v4.1.0) (2020-01-14)


### Features

* **book-meta:** expose book-volume-number ([8d12f13](https://github.com/AmerMathSoc/ams-xml-to-html/commit/8d12f13)), closes [#253](https://github.com/AmerMathSoc/ams-xml-to-html/issues/253)



### [4.0.1](https://github.com/AmerMathSoc/ams-xml-to-html/compare/v4.0.0...v4.0.1) (2020-01-07)


### Bug Fixes

* doc-level for abstract in XSL ([4750873](https://github.com/AmerMathSoc/ams-xml-to-html/commit/4750873)), closes [#252](https://github.com/AmerMathSoc/ams-xml-to-html/issues/252)



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
