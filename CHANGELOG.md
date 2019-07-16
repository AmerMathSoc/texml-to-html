# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
