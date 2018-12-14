import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { AboutUsComponent } from './';
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
