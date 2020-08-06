import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export const COOKIE_CONFIG: NgcCookieConsentConfig = {
  cookie: {
    domain: DEBUG_INFO_ENABLED ? 'localhost' : 'your.domain.com', // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#41d5ab',
    },
    button: {
      background: '#48f100',
    },
  },
  theme: 'edgeless',
  type: 'opt-out',
};
