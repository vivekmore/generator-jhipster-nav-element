import { NgModule } from '@angular/core';
import { TestCookieConsentComponent } from 'app/shared/cookie-consent/cookie-consent.component';
import { COOKIE_CONFIG } from 'app/shared/cookie-consent/cookie-consent.constants';
import { TestCookieConsentService } from 'app/shared/cookie-consent/cookie-consent.service';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';

@NgModule({
  declarations: [TestCookieConsentComponent],
  imports: [NgcCookieConsentModule.forRoot(COOKIE_CONFIG)],
  providers: [TestCookieConsentService],
  exports: [TestCookieConsentComponent],
})
export class TestCookieConsentModule {}
