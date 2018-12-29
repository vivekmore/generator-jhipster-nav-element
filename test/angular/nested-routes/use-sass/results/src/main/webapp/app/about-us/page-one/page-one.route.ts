import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { PageOneComponent } from './page-one.component';

export const PAGE_ONE_ROUTE: Route = {
  path: 'page-one',
  component: PageOneComponent,
  data: {
    authorities: [],
    pageTitle: 'page-one.title'
  },
  canActivate: [UserRouteAccessService]
};
