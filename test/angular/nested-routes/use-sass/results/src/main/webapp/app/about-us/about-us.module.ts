import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';

import { ABOUT_US_ROUTE, AboutUsComponent } from './';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';

@NgModule({
    imports: [
      SharedModule,
      RouterModule.forRoot([ ABOUT_US_ROUTE ], { useHash: true })
    ],
    declarations: [AboutUsComponent, PageOneComponent, PageTwoComponent],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppAboutUsModule {}
