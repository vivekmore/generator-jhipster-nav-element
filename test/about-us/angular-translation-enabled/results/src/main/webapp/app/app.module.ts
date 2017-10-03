...

import { MyAppAboutUsModule } from './about-us/about-us.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
@NgModule({
  imports: [
    ...
    MyAppAboutUsModule,
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
