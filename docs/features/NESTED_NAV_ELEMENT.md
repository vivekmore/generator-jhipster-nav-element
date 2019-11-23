
## A Page With Nested Routes

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

