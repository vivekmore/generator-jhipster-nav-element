import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { <%=componentName%> } from './<%=componentTsName%>';
<%_ for(let i in subComponents) { _%>
import { <%=subComponents[i].routeName%> } from './<%=subComponents[i].componentDirName%>/<%=subComponents[i].componentFileNamePrefix%>.route';
<%_ } _%>

export const <%=routeName%>: Route = {
  path: '<%=locationName%>',
  component: <%=componentName%>,
  data: {
    authorities: [],
    pageTitle: '<%=pageTitle%>'
  },
  canActivate: [UserRouteAccessService],
  children: [
<%_ for(let i in subComponents) { _%>
    <%=subComponents[i].routeName%>,
<%_ } _%>
  ]
};
