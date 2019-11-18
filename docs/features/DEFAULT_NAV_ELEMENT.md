
## A Simple Page (with a corresponding nav element)

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

