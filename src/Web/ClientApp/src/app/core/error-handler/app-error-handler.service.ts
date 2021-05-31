import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { NotificationService } from '../notifications/notification.service';
import { Router } from '@angular/router';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService, private router: Router) {
    super();
  }

  redirectionRoutes = {
    404: '/error/404',
    403: '/error/403',
    500: '/error/500'
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'An error occurred.';

    if (!environment.production) {
      displayMessage += ' See console for details.';
    }

    if ((error instanceof HttpErrorResponse) && !!this.redirectionRoutes[error.status]) {
      // handle server-side error
      const route = this.redirectionRoutes[error.status];

      this.router.navigate([route], {skipLocationChange: true});
      return;
    }

    this.notificationsService.error(displayMessage);

    super.handleError(error);
  }
}
