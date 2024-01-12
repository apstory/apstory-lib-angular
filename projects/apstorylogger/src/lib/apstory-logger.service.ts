import { Inject, Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { LoggerSeverityEnum } from './enum/apstory-logger-severity-enum';
import { ClientError } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class ApstoryLoggerService {

  private appInsights: ApplicationInsights;

  constructor(
    @Inject('instrumentationKey') private instrumentationKey: string,
    @Inject('loggingLevelConsole') private loggingLevelConsole: number = 0,
    @Inject('ignoreClientErrors') private ignoreClientErrors: boolean = false) {
  }

  private async loadAppInsights() {
    if (!this.appInsights) {
      this.appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: this.instrumentationKey,
          loggingLevelConsole: this.loggingLevelConsole,
        }
      });
    }
  }

  async logTrace(message: string, properties?: any, severityLevel?: any, measurements?: any) {
    await this.loadAppInsights();
    if (this.loggingLevelConsole > 0) {
      console.log(message);
      this.appInsights.trackTrace({ message, severityLevel, properties, measurements });
    }
  }

  async logTraceSeverity(message: string, loggerSeverity: LoggerSeverityEnum) {
    await this.loadAppInsights();
    if (this.loggingLevelConsole > 0) {
      console.log(message);
      this.logTrace(message, null, loggerSeverity);
    }
  }

  async logPageView(
    name?: string, uri?: string, measurements?: any, properties?: any, duration?: number, isLoggedIn?: boolean,
    pageType?: string
  ) {
    await this.loadAppInsights();
    this.appInsights.trackPageView({ name, uri, measurements, properties, isLoggedIn, pageType });
    this.logEvent(name, 'Initialize page');
  }

  async logEvent(name: string, properties?: any, measurements?: any) {
    await this.loadAppInsights();
    this.appInsights.trackEvent({ name, properties, measurements });
    this.logTrace(name);
  }

  async logException(exception: Error, handledAt?: string, properties?: any, measurements?: any, severityLevel?: any, id?: string) {
    await this.loadAppInsights();
    if (this.loggingLevelConsole > 0) { console.log(exception); }
    if (this.ignoreClientErrors && exception instanceof ClientError) {
      return;
    }
    this.appInsights.trackException({ exception, properties, measurements, severityLevel, id });
  }

  async setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean) {
    await this.loadAppInsights();
    this.appInsights.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
  }

}
