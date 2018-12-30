# generator-jhipster-nav-element
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]


# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application.

This generator scaffolds a new page and creates a corresponding navigation menu item in the your JHipster application.
Currently following templates are available:


## A simple page with some content

The following (client-side) artifacts are generated:

##### 1. Angular application (assuming your page is called 'about-us'):
 * `src/main/webapp/app/app.module.ts` (_this gets modified_)
 * `src/main/webapp/app/layouts/navbar/navbar.component.html` (_this gets modified_)
 * `src/main/webapp/i18n/{lang}/global.json` (_these get modified_)
 * `src/main/webapp/i18n/{lang}/about-us.json` (_resource is created for i18n_)
 * `src/main/webapp/app/about-us/about-us.component.html`
 * `src/main/webapp/app/about-us/about-us.component.ts`
 * `src/main/webapp/app/about-us/about-us.module.ts`
 * `src/main/webapp/app/about-us/about-us.route.ts`
 * `src/main/webapp/app/about-us/about-us.component.[s]css` (_css/scss is created based on your jhipster config, i.e. useSass in your .yo-rc.json_)
 * `src/main/webapp/app/about-us/index.ts`
 * `src/test/javascript/spec/app/about-us/about-us.component.spec.ts`

##### 2. React:
 * Not supported currently


## Nested Routes Template 

This template creates a page with 2 tabs (sub components/pages) accessible via nested routes
The following (client-side) artifacts are generated/modified:

##### 1. Angular application (assuming your page is called 'hello-world'):
 * `src/main/webapp/app/app.module.ts` (_this gets modified_)
 * `src/main/webapp/app/hello-world/navbar.component.html` (_this gets modified_)
 * `src/main/webapp/i18n/{lang}/global.json` (_these get modified_)
 * `src/main/webapp/i18n/{lang}/hello-world.json` (_resource is created for i18n_)
 * `src/main/webapp/i18n/{lang}/page-one.json` (_resource is created for i18n_)
 * `src/main/webapp/i18n/{lang}/page-two.json` (_resource is created for i18n_)
 * `src/main/webapp/app/hello-world/hello-world.component.html`
 * `src/main/webapp/app/hello-world/hello-world.component.[s]css` (_css/scss is created based on your jhipster config, i.e. useSass in your .yo-rc.json_)
 * `src/main/webapp/app/hello-world/hello-world.component.ts`
 * `src/main/webapp/app/hello-world/hello-world.module.ts`
 * `src/main/webapp/app/hello-world/hello-world.route.ts`
 * `src/main/webapp/app/hello-world/index.ts`
 * `src/test/javascript/spec/app/hello-world/hello-world.component.spec.ts`
 * `src/main/webapp/app/hello-world/page-one/page-one.component.html`
 * `src/main/webapp/app/hello-world/page-one/page-one.component.[s]css` (_css/scss is created based on your jhipster config, i.e. useSass in your .yo-rc.json_)
 * `src/main/webapp/app/hello-world/page-one/page-one.component.ts`
 * `src/main/webapp/app/hello-world/page-one/page-one.route.ts`
 * `src/test/javascript/spec/app/hello-world/page-one/page-one.component.spec.ts`
 * `src/main/webapp/app/hello-world/page-two/page-two.component.html`
 * `src/main/webapp/app/hello-world/page-two/page-two.component.[s]css` (_css/scss is created based on your jhipster config, i.e. useSass in your .yo-rc.json_)
 * `src/main/webapp/app/hello-world/page-two/page-two.component.ts`
 * `src/main/webapp/app/hello-world/page-two/page-two.route.ts`
 * `src/test/javascript/spec/app/hello-world/page-two/page-two.component.spec.ts`

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


# Development Setup

Exclude the following folders from compilation in your favorite IDE (IntelliJ IDEA / WebStorm):

```bash
generators/app/templates
test/**/playground
test/**/results
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
