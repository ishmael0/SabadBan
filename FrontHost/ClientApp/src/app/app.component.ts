import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  title = 'ClientApp';
  routerEvent!: Subscription;
  constructor(private router: Router) {
    this.routerEvent = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
      }
    });
  }
  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }
}
