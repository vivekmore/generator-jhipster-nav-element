import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { <%=componentName%> } from './';

export const <%=routeName%>: Route = {
  path: '<%=locationName%>',
  component: <%=componentName%>,
  data: {
    authorities: [],
    pageTitle: '<%=pageTitle%>'
  },
  canActivate: [UserRouteAccessService]
};
