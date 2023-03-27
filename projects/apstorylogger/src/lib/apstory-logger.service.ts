import { Inject, Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { LoggerSeverityEnum } from './enum/apstory-logger-severity-enum';

@Injectable({
  providedIn: 'root'
})
export class ApstoryLoggerService {

  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: this.instrumentationKey,
      loggingLevelConsole: this.loggingLevelConsole
    }
  });

  constructor(
    @Inject('instrumentationKey') private instrumentationKey: string,
    @Inject('loggingLevelConsole') private loggingLevelConsole: number = 0) {
    this.appInsights.loadAppInsights();
  }

  async logTrace(message: string, properties?: any, severityLevel?: any, measurements?: any) {
    if (this.loggingLevelConsole === 1) {
      console.log(message);
      this.appInsights.trackTrace({ message, severityLevel, properties, measurements });
    }
  }

  async logTraceSeverity(message: string, loggerSeverity: LoggerSeverityEnum) {
    if (this.loggingLevelConsole === 1) {
      console.log(message);
      this.logTrace(message, null, loggerSeverity);
    }
  }

  async logPageView(
    name?: string, uri?: string, measurements?: any, properties?: any, duration?: number, isLoggedIn?: boolean,
    pageType?: string
  ) {
    this.appInsights.trackPageView({ name, uri, measurements, properties, isLoggedIn, pageType });
    this.logEvent(name, 'Initialize page');
  }

  async logEvent(name: string, properties?: any, measurements?: any) {
    this.appInsights.trackEvent({ name, properties, measurements });
    this.logTrace(name);
  }

  async logException(exception: Error, handledAt?: string, properties?: any, measurements?: any, severityLevel?: any, id?: string) {
    if (this.loggingLevelConsole === 1) { console.log(exception); }
    this.appInsights.trackException({ exception, properties, measurements, severityLevel, id });
  }

  async setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean) {
    this.appInsights.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
  }

}
