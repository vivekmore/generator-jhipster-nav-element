import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { <%=routeName%>, <%=componentName%> } from './';

@NgModule({
    imports: [
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
