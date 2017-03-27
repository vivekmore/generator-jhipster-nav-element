import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
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
