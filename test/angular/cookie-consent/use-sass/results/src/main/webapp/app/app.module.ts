...

import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import 'cookieconsent/build/cookieconsent.min';
// jhipster-needle-angular-add-module-import JHipster will add new module here

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

@NgModule({
  imports: [
    ...
    NgcCookieConsentModule.forRoot(cookieConfig),
    // jhipster-needle-angular-add-module JHipster will add new module here
  ],
  declarations: [
    ...
  ],
  providers: [
    ...
  ],
  bootstrap: [
    ...
  ]
})
export class JhipsterAppModule {
}
