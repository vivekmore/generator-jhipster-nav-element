import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyAppSharedModule } from '../shared';

import { ABOUT_US_ROUTE, AboutUsComponent } from './';
import { PageOne } from 'app/about-us/page-one/page-one.component';
import { PageTwo } from 'app/about-us/page-two/page-two.component';

@NgModule({
    imports: [
      MyAppSharedModule,
      RouterModule.forRoot([ ABOUT_US_ROUTE ], { useHash: true })
    ],
    declarations: [
      AboutUsComponent,
      PageOne,
      PageTwo,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppAboutUsModule {}
