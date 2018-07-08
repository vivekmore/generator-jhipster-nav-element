# generator-jhipster-nav-element
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]


# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application.

This generator scaffolds a new page and creates a corresponding navigation menu item in the your JHipster application.

The following (client-side) artifacts are generated:

##### 1. Angular application (assuming your page is called 'about-us'):
 * `src/main/webapp/app/about-us/about-us.component.html`
 * `src/main/webapp/app/about-us/about-us.component.ts`
 * `src/main/webapp/app/about-us/about-us.module.ts`
 * `src/main/webapp/app/about-us/about-us.route.ts`
 * `src/main/webapp/app/about-us/about-us.[s]css`
 * `src/main/webapp/app/about-us/index.ts`
 * `src/main/webapp/i18n/{lang}/about-us.json` (_i18n resources_)
 * `src/test/javascript/spec/app/about-us/about-us.component.spec.ts`

##### 2. React:
 * Not supported currently

# Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)


# Installation

## with NPM

To install this module:
```bash
npm install -g generator-jhipster-nav-element
```

To update this module:
```bash
npm update -g generator-jhipster-nav-element
```

## with Yarn

To install this module:
```bash
yarn global add generator-jhipster-nav-element
```

To update this module:
```bash
yarn global upgrade generator-jhipster-nav-element
```


# Usage

To run the module on a JHipster generated application:

```bash
yo jhipster-nav-element
```


# License

Apache-2.0 © [Vivek More]


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-nav-element.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-nav-element
[travis-image]: https://travis-ci.org/vivekmore/generator-jhipster-nav-element.svg?branch=master
[travis-url]: https://travis-ci.org/vivekmore/generator-jhipster-nav-element
[daviddm-image]: https://david-dm.org/vivekmore/generator-jhipster-nav-element.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/vivekmore/generator-jhipster-nav-element
[coveralls-image]: https://coveralls.io/repos/github/vivekmore/generator-jhipster-nav-element/badge.svg
[coveralls-url]: https://coveralls.io/github/vivekmore/generator-jhipster-nav-element
