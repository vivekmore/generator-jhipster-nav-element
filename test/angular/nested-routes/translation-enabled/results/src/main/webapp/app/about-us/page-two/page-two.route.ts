import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PageTwoComponent } from './page-two.component';

export const PAGE_TWO_ROUTE: Route = {
  path: 'page-two',
  component: PageTwoComponent,
  data: {
    authorities: [],
    pageTitle: 'page-two.title'
  },
  canActivate: [UserRouteAccessService]
};
