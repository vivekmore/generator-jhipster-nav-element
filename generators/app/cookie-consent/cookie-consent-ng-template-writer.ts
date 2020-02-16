// import _ from 'lodash';
const jhipsterUtils = require('generator-jhipster/generators/utils');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

export function write(generator: any) {
    const jhipsterAppConfig = generator.jhipsterAppConfig;

    generator.baseName = jhipsterAppConfig.baseName;
    generator.packageName = jhipsterAppConfig.packageName;
    generator.angularXAppName = generator.getAngularXAppName();
    generator.enableTranslation = jhipsterAppConfig.enableTranslation;
    generator.nativeLanguage = jhipsterAppConfig.nativeLanguage;
    generator.useSass = jhipsterAppConfig.useSass;

    generator.log('------------------------------------------------------------');
    generator.log(`baseName=${generator.baseName}`);
    generator.log(`packageName=${generator.packageName}`);
    generator.log(`angularAppName=${generator.angularAppName}`);
    generator.log(`enableTranslation=${generator.enableTranslation}`);
    generator.log('------------------------------------------------------------');

    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

    // Add required dependencies to package.json
    generator.addNpmDependency('cookieconsent', '3.1.1');
    generator.addNpmDependency('ngx-cookieconsent', '2.2.3');

    // Add changes to app.module.ts
    const modulePath = `${webappDir}app/app.module.ts`;
    const importContent1 = 'import { DEBUG_INFO_ENABLED } from \'app/app.constants\';';
    generator.rewriteFile(modulePath, 'jhipster-needle-angular-add-module-import', importContent1);
    const importContent2 = 'import { NgcCookieConsentConfig, NgcCookieConsentModule } from \'ngx-cookieconsent\';';
    generator.rewriteFile(modulePath, 'jhipster-needle-angular-add-module-import', importContent2);
    const importContent3 = 'import \'cookieconsent/build/cookieconsent.min\';';
    generator.rewriteFile(modulePath, 'jhipster-needle-angular-add-module-import', importContent3);

    const cookieConsentConfigContent = `
const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: DEBUG_INFO_ENABLED ? 'localhost' : 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule(`;
    generator.replaceContent(modulePath, '@NgModule(', cookieConsentConfigContent);

    const moduleContent = 'NgcCookieConsentModule.forRoot(cookieConfig),';
    generator.rewriteFile(modulePath, 'jhipster-needle-angular-add-module', moduleContent);

    // Add changes to vendor.scss
    generator.addVendorSCSSStyle('@import \'~cookieconsent/build/cookieconsent.min.css\';', 'For more customization see: https://www.npmjs.com/package/ngx-cookieconsent');

    // Add changes to main.component.ts
    const mainComponentPath = `${webappDir}app/layouts/main/main.component.ts`;
    const mainComponentImportsContent = `
import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component(`;
    generator.replaceContent(mainComponentPath, '@Component(', mainComponentImportsContent);
    const mainComponentSubscriptionsContent = `
    // keep refs to subscriptions to be able to unsubscribe later
    private popupOpenSubscription: Subscription;
    private popupCloseSubscription: Subscription;
    private initializeSubscription: Subscription;
    private statusChangeSubscription: Subscription;
    private revokeChoiceSubscription: Subscription;
    private noCookieLawSubscription: Subscription;

    constructor(private ngcCookieConsentService: NgcCookieConsentService, `;
    generator.replaceContent(mainComponentPath, 'constructor(', mainComponentSubscriptionsContent);

    const ngOnDestroyContent = `

    ngOnDestroy(): void {
        // unsubscribe to cookieconsent observables to prevent memory leaks
        this.popupOpenSubscription.unsubscribe();
        this.popupCloseSubscription.unsubscribe();
        this.initializeSubscription.unsubscribe();
        this.statusChangeSubscription.unsubscribe();
        this.revokeChoiceSubscription.unsubscribe();
        this.noCookieLawSubscription.unsubscribe();
    }

    ngOnInit(): void {
        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.ngcCookieConsentService.popupOpen$.subscribe(() => {
            // handle your event here
        });

        this.popupCloseSubscription = this.ngcCookieConsentService.popupClose$.subscribe(() => {
            // handle your event here
        });

        this.initializeSubscription = this.ngcCookieConsentService.initialize$.subscribe((event: NgcInitializeEvent) => {
            // handle your event here
        });

        this.statusChangeSubscription = this.ngcCookieConsentService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
            // handle your event here
        });

        this.revokeChoiceSubscription = this.ngcCookieConsentService.revokeChoice$.subscribe(() => {
            // handle your event here
        });

        this.noCookieLawSubscription = this.ngcCookieConsentService.noCookieLaw$.subscribe((event: NgcNoCookieLawEvent) => {
            // handle your event here
        });`;
    generator.replaceContent(mainComponentPath, 'ngOnInit(): void {', ngOnDestroyContent);

    if (!jhipsterUtils.checkRegexInFile(mainComponentPath, /\bOnDestroy\b/g, generator)) {
        // add import
        jhipsterUtils.replaceContent(
            {
                file: mainComponentPath,
                pattern: / } from '@angular\/core'/g,
                content: ', OnDestroy } from \'@angular/core\''
            },
            generator
        );

        // add implements declaration
        jhipsterUtils.replaceContent(
            {
                file: mainComponentPath,
                pattern: /implements/g,
                content: 'implements OnDestroy,'
            },
            generator
        );
    }
}
