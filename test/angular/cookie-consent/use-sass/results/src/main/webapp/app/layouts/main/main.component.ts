...

import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component()
export class MyMainComponent
...


    // keep refs to subscriptions to be able to unsubscribe later
    private popupOpenSubscription: Subscription;
    private popupCloseSubscription: Subscription;
    private initializeSubscription: Subscription;
    private statusChangeSubscription: Subscription;
    private revokeChoiceSubscription: Subscription;
    private noCookieLawSubscription: Subscription;

    constructor(private ccService: NgcCookieConsentService, service: Service)
...



    ngOnDestroy() {
        // unsubscribe to cookieconsent observables to prevent memory leaks
        this.popupOpenSubscription.unsubscribe();
        this.popupCloseSubscription.unsubscribe();
        this.initializeSubscription.unsubscribe();
        this.statusChangeSubscription.unsubscribe();
        this.revokeChoiceSubscription.unsubscribe();
        this.noCookieLawSubscription.unsubscribe();
    }

    ngOnInit() {
        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
            // handle your event here
        });

        this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
            // handle your event here
        });

        this.initializeSubscription = this.ccService.initialize$.subscribe((event: NgcInitializeEvent) => {
            // handle your event here
        });

        this.statusChangeSubscription = this.ccService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
            // handle your event here
        });

        this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(() => {
            // handle your event here
        });

        this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe((event: NgcNoCookieLawEvent) => {
            // handle your event here
        });
}

...

