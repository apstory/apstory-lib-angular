import { Inject, Injectable } from '@angular/core';
import { ApplicationInsights, ICustomProperties, IEventTelemetry, IExceptionTelemetry, IPageViewTelemetry, ITraceTelemetry, SeverityLevel } from '@microsoft/applicationinsights-web';
import { LoggerSeverityEnum } from './enum/apstory-logger-severity-enum';
import { ClientError } from './model/client-error';

@Injectable({
  providedIn: 'root'
})
export class ApstoryLoggerService {

  private appInsights: ApplicationInsights;
  private initializationPromise: Promise<void>;

  constructor(
    @Inject('instrumentationKey') private instrumentationKey: string,
    @Inject('loggingLevelConsole') private loggingLevelConsole: number = 0,
    @Inject('ignoreClientErrors') private ignoreClientErrors: boolean = false) {
  }

  private loadAppInsights(): Promise<void> {
    if (!this.initializationPromise) {
      this.initializationPromise = new Promise<void>((resolve, reject) => {
        try {
          if (!this.instrumentationKey || this.instrumentationKey.trim() === '') {
            reject(new Error('Application Insights instrumentation key is required'));
            return;
          }
          
          this.appInsights = new ApplicationInsights({
            config: {
              instrumentationKey: this.instrumentationKey,
              loggingLevelConsole: this.loggingLevelConsole,
            }
          });
          this.appInsights.loadAppInsights();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
    return this.initializationPromise;
  }

  async logTrace(message: string, properties?: any, severityLevel?: any, measurements?: any) {
    try {
      await this.loadAppInsights();
      if (this.loggingLevelConsole > 0) {
        console.log(message);
        this.appInsights.trackTrace({ message, severityLevel, properties, measurements });
      }
    } catch (error) {
      console.error('Failed to log trace:', error);
    }
  }

  async logTraceSeverity(message: string, loggerSeverity: LoggerSeverityEnum) {
    try {
      await this.loadAppInsights();
      if (this.loggingLevelConsole > 0) {
        console.log(message);
        this.appInsights.trackTrace({ message, severityLevel: loggerSeverity });
      }
    } catch (error) {
      console.error('Failed to log trace with severity:', error);
    }
  }

  async logPageView(
    name?: string, uri?: string, measurements?: any, properties?: any, duration?: number, isLoggedIn?: boolean,
    pageType?: string
  ) {
    try {
      await this.loadAppInsights();
      this.appInsights.trackPageView({ name, uri, measurements, properties, isLoggedIn, pageType });
    } catch (error) {
      console.error('Failed to log page view:', error);
    }
  }

  async logEvent(name: string, properties?: any, measurements?: any) {
    try {
      await this.loadAppInsights();
      this.appInsights.trackEvent({ name, properties, measurements });
    } catch (error) {
      console.error('Failed to log event:', error);
    }
  }

  async logException(exception: Error, handledAt?: string, properties?: any, measurements?: any, severityLevel?: any, id?: string) {
    try {
      await this.loadAppInsights();
      if (this.loggingLevelConsole > 0) { console.log(exception); }
      if (this.ignoreClientErrors && exception instanceof ClientError) {
        return;
      }
      this.appInsights.trackException({ exception, properties, measurements, severityLevel, id });
    } catch (error) {
      console.error('Failed to log exception:', error);
    }
  }

  async setAuthenticatedUserContext(authenticatedUserId: string, accountId?: string, storeInCookie?: boolean) {
    try {
      await this.loadAppInsights();
      this.appInsights.setAuthenticatedUserContext(authenticatedUserId, accountId, storeInCookie);
    } catch (error) {
      console.error('Failed to set authenticated user context:', error);
    }
  }

}
