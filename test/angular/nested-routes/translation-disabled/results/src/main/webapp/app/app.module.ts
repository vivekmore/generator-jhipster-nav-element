...

import { SomeProjectAppAboutUsModule } from './about-us/about-us.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
@NgModule({
  imports: [
    ...
    SomeProjectAppAboutUsModule,
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
