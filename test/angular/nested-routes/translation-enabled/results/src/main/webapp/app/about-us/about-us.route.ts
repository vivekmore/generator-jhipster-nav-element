import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AboutUsComponent } from './about-us.component';
import { PAGE_ONE_ROUTE } from './page-one/page-one.route';
import { PAGE_TWO_ROUTE } from './page-two/page-two.route';

export const ABOUT_US_ROUTE: Route = {
  path: 'about-us',
  component: AboutUsComponent,
  data: {
    authorities: [],
    pageTitle: 'about-us.title'
  },
  canActivate: [UserRouteAccessService],
  children: [
    PAGE_ONE_ROUTE,
    PAGE_TWO_ROUTE,
  ]
};
