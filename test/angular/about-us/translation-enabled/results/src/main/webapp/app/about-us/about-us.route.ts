import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { AboutUsComponent } from './about-us.component';

export const ABOUT_US_ROUTE: Route = {
  path: 'about-us',
  component: AboutUsComponent,
  data: {
    authorities: [],
    pageTitle: 'about-us.title'
  },
  canActivate: [UserRouteAccessService]
};
