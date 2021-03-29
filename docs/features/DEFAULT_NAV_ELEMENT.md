# A Simple Page (with a corresponding nav element)

The following (client-side) artifacts are generated:

##### 1. Angular application (assuming your page is called 'about-us'):
 * `src/main/webapp/app/app.module.ts` (_this gets modified_)
 * `src/main/webapp/app/layouts/navbar/navbar.component.html` (_this gets modified_)
 * `src/main/webapp/i18n/{lang}/global.json` (_modified_)
 * `src/main/webapp/i18n/{lang}/about-us.json` (_resource created for i18n_)
 * `src/main/webapp/app/about-us/about-us.component.html`
 * `src/main/webapp/app/about-us/about-us.component.ts`
 * `src/main/webapp/app/about-us/about-us.module.ts`
 * `src/main/webapp/app/about-us/about-us.route.ts`
 * `src/main/webapp/app/about-us/about-us.component.[s]css` (_css/scss is created based on your JHipster app config, i.e. useSass in your .yo-rc.json_)
 * `src/test/javascript/spec/app/about-us/about-us.component.spec.ts`

##### 2. React (assuming your page is called 'about-us'):
 * `src/main/webapp/app/modules/about-us/about-us.[s]css` (_css/scss is created based on your JHipster app config, i.e. useSass in your .yo-rc.json_)
 * `src/main/webapp/app/modules/about-us/about-us.tsx`
 * `src/test/javascript/spec/app/shared/layout/header/header.spec.tsx`
 * `src/main/webapp/i18n/{lang}/about-us.json` (_resource created for i18n_)
 * `src/main/webapp/i18n/{lang}/global.json` (_modified_)
 * `src/main/webapp/app/config/icon-loader.ts` (_modified_)
 * `src/main/webapp/app/routes.tsx` (_modified_)
 * `src/main/webapp/app/shared/layout/header/header-components.tsx` (_modified_)
 * `src/main/webapp/app/shared/layout/header/header.tsx` (_modified_)

-----

#💚 this module? [![Donate][donate-image]][donate-url]

[donate-image]: https://img.shields.io/badge/buy%20me%20a%20coffee-brightgreen?style=for-the-badge&logo=paypal
[donate-url]: https://www.paypal.me/vivekdmore
