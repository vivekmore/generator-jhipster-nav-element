import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { <%=angularXAppName%>SharedModule } from '../shared';

import { <%=routeName%>, <%=componentName%> } from './';

@NgModule({
    imports: [
      <%=angularXAppName%>SharedModule,
      RouterModule.forRoot([ <%=routeName%> ], { useHash: true })
    ],
    declarations: [
      <%=componentName%>,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class <%=moduleName%> {}
