import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { <%=angularXAppName%>SharedModule } from '../shared';

import { <%=routeName%>, <%=componentName%> } from './';
<%_ for(let i in subComponents) { _%>
import { <%=subComponents[i].componentName%> } from './<%=subComponents[i].componentDirName%>/<%=subComponents[i].componentFileNamePrefix%>.component';
<%_ } _%>

@NgModule({
    imports: [
      <%=angularXAppName%>SharedModule,
      RouterModule.forRoot([ <%=routeName%> ], { useHash: true })
    ],
    declarations: [<%=componentName%><%_ for(let i in subComponents) { _%>, <%= subComponents[i].componentName %><%_ } _%>],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class <%=moduleName%> {}
